#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var argv = yargs_1.default
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
var flatten = function (args) {
    if (!Array.isArray(args)) {
        return args.split(',');
    }
    return args.reduce(function (acc, arg) {
        var splitted = arg.split(',');
        acc = acc.concat(splitted);
        return acc;
    }, []);
};
var createJson = function () {
    var keys = Object.keys(process.env);
    if (argv.picks !== undefined) {
        var picks_1 = flatten(argv.picks);
        keys = keys.filter(function (key) { return picks_1.includes(key); });
    }
    else if (argv.omits !== undefined) {
        var omits = flatten(argv.omits);
        keys = keys.filter(function (key) { return !argv.omits.includes(key); });
    }
    var result = keys.reduce(function (acc, key) {
        acc[key] = process.env[key];
        return acc;
    }, {});
    return JSON.stringify(result);
};
process.stdout.write(createJson());
//# sourceMappingURL=index.js.map