#!/usr/bin/env bun
import { getStagedDiff } from "./git/diff";
import { Command } from 'commander';
import chalk from 'chalk';
import { parseDiff } from "./git/parser";
import { FileChange } from "./types";

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
  
  program
  .command("parse")
  .description("Parse staged diff")
  .action(async () => {
    const diff = await getStagedDiff();
    const parsed = parseDiff(diff);

    console.log(parsed);
  });

  program
  .command("generate")
  .description("Generate commit message from staged changes")
  .action(async () => {
    const diff = await getStagedDiff();

    // ❌ Validation: No staged changes
    if (!diff || diff.trim() === "") {
      console.log(
        chalk.red("❌ No staged changes found. Did you forget to git add?")
      );
      process.exit(1);
    }

    // ✅ Parse diff
    const parsed = parseDiff(diff);

    // ✅ Success message
    console.log(
      chalk.green(`✅ Found ${parsed.length} changed file(s)`)
    );
  });
  


// 🚫 Ignore list
const IGNORE_FILES = [
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  ".DS_Store"
];

// 🔍 Filter function
export function filterChanges(changes: FileChange[]): FileChange[] {
  return changes.filter((change) => {
    return !IGNORE_FILES.some((ignore) =>
      change.file.includes(ignore)
    );
  });
}
program.parse(process.argv);
