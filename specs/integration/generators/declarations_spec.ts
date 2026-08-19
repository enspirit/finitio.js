import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import {
  FIXTURES, GENERATED, ROOT, bundle, declarations, formatDiagnostics, typecheck,
} from './helpers';

//
// `finitio types` emits the same types as `bundle -t typescript`, without the
// loader and without the inlined AST.
//
describe('generators/typescript declarations', function() {

  this.timeout(60000);

  FIXTURES.forEach((fixture) => {

    describe(`for \`${fixture.name}\``, () => {

      it('carries no loader and no inlined ast', () => {
        const types = declarations(fixture);

        expect(types).not.to.contain('export default');
        expect(types).not.to.contain('importResolver');
        expect(types).not.to.contain('SystemAst');
        expect(types.length).to.be.below(bundle(fixture).length);
      });

      it('is exactly what the bundle carries', () => {
        // Same generator, same input: the bundle must be the declarations
        // wrapped in a loader, never a second rendering of the schema.
        expect(bundle(fixture)).to.contain(declarations(fixture));
      });

      it('compiles under --strict as a .d.ts', () => {
        const file = path.join(GENERATED, `${fixture.name}.declarations.d.ts`);
        fs.mkdirSync(path.join(ROOT, GENERATED), { recursive: true });
        fs.writeFileSync(
          path.join(ROOT, file),
          `import type { Type } from 'finitio';\n${declarations(fixture)}`
        );

        const diagnostics = typecheck([file]);
        expect(diagnostics, `\n${formatDiagnostics(diagnostics)}\n`).to.eql([]);
      });

    });

  });

});
