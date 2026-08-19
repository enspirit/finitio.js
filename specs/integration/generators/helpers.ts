import fs from 'fs';
import path from 'path';
import ts from 'typescript';
import Finitio from '../../../src/finitio';
import { TargetLanguage } from '../../../src/finitio/bundlers';

export const ROOT = path.resolve(__dirname, '../../..');
export const HERE = path.join('specs', 'integration', 'generators');
export const FIXTURES_DIR = path.join(HERE, 'fixtures');
export const EXPECTED = path.join(HERE, 'expected');
export const ASSERTIONS = path.join(HERE, 'assertions');
// Generated bundles land here, so that the assertion files can import them and
// so that failures are inspectable. Git-ignored.
export const GENERATED = path.join(HERE, '.generated');

import type { GeneratorOptions } from '../../../src/finitio/generators/typescript';

export type Fixture = {
  name: string
  // Generator options this fixture is bundled with.
  typescript?: Partial<GeneratorOptions>
}

export const FIXTURES: Array<Fixture> = [
  { name: 'simple' },
  { name: 'generics' },
  { name: 'namespaces' },
  { name: 'collisions' },
  { name: 'kitchen' },
  { name: 'documented' },
  { name: 'literals' },
  { name: 'extras' },
  { name: 'unions', typescript: { anyAs: 'unknown' } },
  { name: 'brands', typescript: { brands: true, anyAs: 'unknown' } },
  { name: 'reserved' },
  { name: 'identity' },
  { name: 'placeholders' },
];

//
// Bundles a fixture to TypeScript.
//
// The source url is passed explicitly, and relative to the repository root, so
// that the golden files do not depend on where the repository is checked out.
//
export const bundle = (fixture: Fixture): string => {
  const schemaPath = path.join(FIXTURES_DIR, `${fixture.name}.fio`);

  return Finitio.bundleFile(
    schemaPath,
    {
      sourceUrl: `file://${schemaPath}`,
      typescript: fixture.typescript,
      // Check every fixture against the runtime while bundling it: a golden
      // file for a schema that does not even compile would prove nothing.
      check: true,
      // `kitchen.fio` defines an ADT over a JS class of its own.
      JsTypes: { Field: class Field {} },
    },
    TargetLanguage.Typescript
  );
};

//
// The declarations of a fixture: the types alone, as `finitio types` emits
// them.
//
export const declarations = (fixture: Fixture): string => {
  const schemaPath = path.join(FIXTURES_DIR, `${fixture.name}.fio`);

  return Finitio.typesFile(schemaPath, {
    sourceUrl: `file://${schemaPath}`,
    check: true,
    JsTypes: { Field: class Field {} },
    typescript: fixture.typescript,
  });
};

export const generatedPath = (name: string) => path.join(GENERATED, `${name}.ts`);
export const expectedPath = (name: string) => path.join(EXPECTED, `${name}.ts`);

export const writeGenerated = (name: string, source: string) => {
  fs.mkdirSync(path.join(ROOT, GENERATED), { recursive: true });
  fs.writeFileSync(path.join(ROOT, generatedPath(name)), source);
};

export type Diagnostic = {
  file: string
  line: number
  code: number
  message: string
}

//
// Type-checks `files` under `--strict`, and returns the diagnostics that
// belong to them.
//
// Diagnostics raised inside finitio's own sources are filtered out: the
// library is authored with `strict: false` and is not what these specs are
// about. `skipLibCheck` covers the .d.ts of dependencies.
//
export const typecheck = (files: Array<string>): Array<Diagnostic> => {
  const rooted = files.map(f => path.join(ROOT, f));

  const program = ts.createProgram(rooted, {
    strict: true,
    noEmit: true,
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.Node10,
    esModuleInterop: true,
    resolveJsonModule: true,
    allowJs: true,
    skipLibCheck: true,
    baseUrl: ROOT,
    paths: {
      // The generated bundles `import ... from 'finitio'`.
      finitio: ['src/finitio.ts'],
    },
  });

  const owned = new Set(rooted.map(f => path.normalize(f)));

  return ts.getPreEmitDiagnostics(program)
    .filter(d => !!d.file && owned.has(path.normalize(d.file.fileName)))
    .map((d) => {
      const { line } = d.file!.getLineAndCharacterOfPosition(d.start || 0);
      return {
        file: path.relative(ROOT, d.file!.fileName),
        line: line + 1,
        code: d.code,
        message: ts.flattenDiagnosticMessageText(d.messageText, ' '),
      };
    });
};

//
// Transpiles a generated bundle and evaluates it, with `finitio` resolved to
// this very source tree. Returns the loader the bundle exports.
//
// Type-checking says nothing about the runtime half of the template, which
// this covers.
//
export const evaluate = (source: string) => {
  const js = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.CommonJS,
      esModuleInterop: true,
    },
  }).outputText;

  const module = { exports: {} as { default?: unknown } };
  const require_ = (name: string) => {
    if (name === 'finitio') { return { __esModule: true, default: Finitio, ...Finitio }; }
    throw new Error(`Unexpected require: ${name}`);
  };

  new Function('require', 'exports', 'module', js)(require_, module.exports, module);

  return module.exports.default as (world?: unknown) => { dress: (v: unknown) => unknown };
};

export const formatDiagnostics = (diagnostics: Array<Diagnostic>) =>
  diagnostics.map(d => `  ${d.file}:${d.line} TS${d.code}: ${d.message}`).join('\n');
