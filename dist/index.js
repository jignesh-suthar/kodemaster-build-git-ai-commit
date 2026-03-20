#!/usr/bin/env bun
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
// test
const program = new commander_1.Command();
program
    .name('git-ai-commit')
    .description('AI-powered commit message generator')
    .version('1.0.0');
// TODO: Uncomment the code below to pass the first stage
program.command('hello').description('Test command').action(() => { console.log(chalk_1.default.green('Hello from git-ai-commit!')); });
program.parse(process.argv);
