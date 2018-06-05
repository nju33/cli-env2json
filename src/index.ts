#!/usr/bin/env node
import yargs from 'yargs';

const argv = yargs
  // @ts-ignore
  .option('picks', {
    alias: 'p',
    describe: 'includes variable key',
    type: 'array',
  })
  .option('omits', {
    alias: 'o',
    describe: 'not includes variable key',
    type: 'array',
  })
  .help().argv;

const flatten = (args: string | string[]) => {
  if (!Array.isArray(args)) {
    return args.split(',');
  }

  return args.reduce(
    (acc, arg) => {
      const splitted = arg.split(',');
      acc = [...acc, ...splitted];
      return acc;
    },
    [] as string[],
  );
};

const createJson = () => {
  let keys = Object.keys(process.env);
  if (argv.picks !== undefined) {
    const picks = flatten(argv.picks);
    keys = keys.filter(key => picks.includes(key));
  } else if (argv.omits !== undefined) {
    const omits = flatten(argv.omits);
    keys = keys.filter(key => !argv.omits.includes(key));
  }

  const result = keys.reduce(
    (acc, key) => {
      acc[key] = process.env[key] as string;

      return acc;
    },
    {} as {[k: string]: string},
  );

  return JSON.stringify(result);
};

process.stdout.write(createJson());
