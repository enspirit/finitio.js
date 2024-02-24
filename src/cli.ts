import fs from 'fs';
import { program, default as Commander } from 'commander';
import type { World } from './finitio';
import { TypeError } from './finitio';
import Finitio from './finitio';
import { TargetLanguage } from './finitio/bundlers';

const options = program.opts();

const world = function(sourceUrl: string, extra?: Record<string, unknown>) {
  const w: World = {
    failfast: options.fast,
    sourceUrl: sourceUrl,
    check: !!options.fast,
    ...extra,
  };
  return w;
};

const schema = function(path: string) {
  return Finitio.system(
    fs.readFileSync(path).toString(),
    world(path)
  );
};

program.version(`finitio.js ${Finitio.VERSION} (c) Bernard, Louis Lambeau & the University of Louvain`)
  .option('-f, --fast', 'Stop on first validation error')
  .option('--stack', 'Show stack trace on error')

  program.command('bundle')
  .description('Bundle the input schema as a loader for the specified target language')
  .option('--url <url>', 'Specify the bundle global url')
  .option('--no-check', 'Do not try to check the system before bundling')
  .option('--prelude <path>', 'Path to a file to include as prelude of the generated bundle')
  .option('--stdlib <path>', 'Set the stdlib path')
  .addOption(
    new Commander.Option('-t, --target <language>', 'Set the target language')
      .default(TargetLanguage.Javascript)
      .choices(Object.values(TargetLanguage))
    )
  .addArgument(
    new Commander.Argument(
      '<schema>',
      'path to a finitio schema',
    )
  )
  .action((path, options) => {
    const world: World = {
      failfast: options.fast,
      check: !!options.fast,
      sourceUrl: options.url || `file://${path}`,
      stdlibPath: options.stdlib
    }

    const bundle = Finitio.bundleFile(path, world, options.target);
    const prelude = options.prelude ? fs.readFileSync(options.prelude) : ''
    return console.log(
      prelude + '\n' + bundle
    );
  })

program.command('validate')
  .description('Validate data against a finitio schema')
  .addArgument(
    new Commander.Argument(
      '<schema>',
      'path to a finitio schema',
    )
  )
  .addArgument(
    new Commander.Argument(
      '<input>',
      'path to json data',
    )
  )
  .action((schemaPath, inputPath) => {
    const s = schema(schemaPath);
    const file = fs.readFileSync(inputPath);
    const data = JSON.parse(file.toString());
    console.log(s.dress(data));
  })

type ErrorMatcher = (err: Error|unknown) => boolean
type ErrorHandler = (err: Error|unknown) => void
type Strategy = [ErrorMatcher, ErrorHandler]
const strategies: Array<Strategy> = [];

const errorManager = function(e) {
  const results: Array<unknown> = [];
  for (let i = 0, len = strategies.length; i < len; i++) {
    const s = strategies[i];
    if (s[0](e)) {
      s[1](e);
      break;
    } else {
      results.push(void 0);
    }
  }
  return results;
};

strategies.push([
  function(e) {
    return e instanceof TypeError;
  }, function(e) {
    const err = e as TypeError;
    if (options.stack) {
      return console.log(err.explainTree());
    } else {
      return console.log(err.explain());
    }
  },
]);

type SyntaxError = Error & {
  line: number,
  column: number
  expected: unknown
}

strategies.push([
  function(e) {
    return (e as Error).name === 'SyntaxError';
  }, function(e) {
    const err = e as SyntaxError;
    console.log(`[${err.line}:${err.column}] ${err.message}`);
    if (options.stack) {
      return console.log(err.expected);
    }
  },
]);

strategies.push([
  function(_e) {
    return true;
  }, function(e) {
    const err = e as Error;
    console.log(err.message);
    if (options.stack) {
      return console.log(err.stack);
    }
  },
]);

try {
  program.parse(process.argv);
} catch (e) {
  errorManager(e);
}
