#!/usr/bin/env bun
import { getStagedDiff } from "./git/diff";
import { Command } from 'commander';
import chalk from 'chalk';
// test
const program = new Command();
program
  .name('git-ai-commit')
  .description('AI-powered commit message generator')
  .version('1.0.0');

// TODO: Uncomment the code below to pass the first stage
 program
   .command('hello')
   .description('Test command')
   .action(() => {
      console.log(chalk.green.bold('Hello from git-ai-commit!'));
      console.log(chalk.blue.bold("Welcome to git-ai-commit CLI"));
      console.log(chalk.blue.bold('Information'));
      console.log(chalk.green.bold('Success!'));
      console.log(chalk.red('Error!'));
   });

program
  .command("diff")
  .description("Show staged diff")
  .action(async () => {
    const diff = await getStagedDiff();
    console.log(diff);
  });
program.parse(process.argv);
