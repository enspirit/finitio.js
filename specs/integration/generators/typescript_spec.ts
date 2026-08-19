import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import {
  ASSERTIONS, FIXTURES, ROOT, bundle, evaluate, expectedPath,
  formatDiagnostics, generatedPath, typecheck, writeGenerated,
} from './helpers';

//
// Set UPDATE_GOLDEN=1 to rewrite the expected files after an intentional
// change to the generator.
//
const UPDATE_GOLDEN = !!process.env.UPDATE_GOLDEN;

describe('generators/typescript', function() {

  // Type-checking spins up a full TypeScript program over finitio's sources.
  this.timeout(60000);

  const bundled: Record<string, string> = {};

  before(() => {
    FIXTURES.forEach((fixture) => {
      bundled[fixture.name] = bundle(fixture);
      writeGenerated(fixture.name, bundled[fixture.name]);
    });
  });

  describe('the generated bundle', () => {

    FIXTURES.forEach(({ name }) => {

      it(`matches the golden file for \`${name}\``, () => {
        const golden = path.join(ROOT, expectedPath(name));

        if (UPDATE_GOLDEN) {
          fs.mkdirSync(path.dirname(golden), { recursive: true });
          fs.writeFileSync(golden, bundled[name]);
        }

        expect(fs.existsSync(golden), `missing golden file, run with UPDATE_GOLDEN=1: ${expectedPath(name)}`)
          .to.eql(true);
        expect(bundled[name]).to.eql(fs.readFileSync(golden).toString());
      });

    });

  });

  describe('the generated loader', () => {

    it('yields a system that dresses, imports resolved from the bundle', () => {
      const load = evaluate(bundled.simple);
      const system = load({
        Finitio: undefined,
        // No import resolver at all: everything must come from the bundle.
        importResolver: undefined,
      });

      const dressed = system.dress({
        name: 'finitio',
        version: '2.1.0',
        releasedAt: '2026-08-06',
      }) as { name: string, releasedAt: Date };

      expect(dressed.name).to.eql('finitio');
      expect(dressed.releasedAt).to.be.an.instanceof(Date);
    });

    //
    // The template's placeholders used to be filled one after the other, so a
    // schema mentioning `URL` had its own text substituted and left the loader
    // calling `importResolver('URL')` -- which resolves to nothing. Compiling
    // the bundle says nothing about that: only loading it does.
    //
    it('resolves its own url, whatever the schema calls its types', () => {
      const load = evaluate(bundled.placeholders);
      const system = load({ Finitio: undefined, importResolver: undefined });

      const dressed = system.dress({
        doc: 'a doc',
        home: 'http://example.org',
        price: '42',
      }) as { home: string, price: string };

      expect(dressed.home).to.eql('http://example.org');
      expect(dressed.price).to.eql('42');
    });

  });

  describe('the generated typescript', () => {

    FIXTURES.forEach(({ name }) => {

      it(`compiles under --strict for \`${name}\``, () => {
        const diagnostics = typecheck([generatedPath(name)]);

        expect(diagnostics, `\n${formatDiagnostics(diagnostics)}\n`).to.eql([]);
      });

      it(`has the expected types for \`${name}\``, () => {
        const assertions = path.join(ASSERTIONS, `${name}.assert.ts`);

        expect(
          fs.existsSync(path.join(ROOT, assertions)),
          `missing assertion file: ${assertions}`
        ).to.eql(true);

        const diagnostics = typecheck([generatedPath(name), assertions]);

        expect(diagnostics, `\n${formatDiagnostics(diagnostics)}\n`).to.eql([]);
      });

    });

  });

});
