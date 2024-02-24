import fs from 'fs';
import { program } from 'commander';
import type { World } from './finitio';
import { TypeError } from './finitio';
import Finitio from './finitio';

const options = program.version(`finitio.js ${Finitio.VERSION} (c) Bernard, Louis Lambeau & the University of Louvain`)
  .usage('[options] SCHEMA.fio [DATA.json]')
  .option('-b, --bundle', 'Bundle the input schema as a javascript loader')
  .option('-l, --lang [lang]', 'The target language for the bundle [typescript, javascript] (defaults to javascript)')
  .option('--url [url]', 'Specify the bundle global url')
  .option('-v, --validate', 'Valid input data against the schema')
  .option('-f, --fast', 'Stop on first validation error')
  .option('--no-check', 'Do not try to check the system before bundling')
  .option('--stack', 'Show stack trace on error')
  .parse(process.argv)
  .opts()

const sourceUrl = function() {
  if (typeof options.url === 'string') {
    return options.url;
  } else {
    return `file://${program.args[0]}`;
  }
};

const schemaFile = function() {
  return program.args[0];
};

const schemaSource = function() {
  return fs.readFileSync(schemaFile()).toString();
};

const world = function() {
  const w: World = {
    sourceUrl: sourceUrl(),
    failfast: options.fast,
  };
  if (options.check) {
    w.check = true;
  }
  return w;
};

const schema = function() {
  return Finitio.system(schemaSource(), world());
};

const data = function() {
  const dataFile = program.args[1];
  const dataSource = fs.readFileSync(dataFile).toString();
  return JSON.parse(dataSource);
};

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

const actions: Record<string, () => void> = {};

actions.bundle = function() {
  const lang = options.lang || 'javascript';
  return console.log(Finitio.bundleFile(schemaFile(), world(), lang));
};

actions.validate = function() {
  return console.log(schema().dress(data(), world()));
};

try {
  let action;
  if (options.bundle) {
    action = actions.bundle;
  } else if (options.validate) {
    action = actions.validate;
  }
  if (action != null) {
    action();
  } else {
    program.outputHelp();
  }
} catch (error) {
  const e = error;
  errorManager(e);
}

