import CommandCLI from './CommandCLI.ts';
import {CommandKey} from './CommandKey.ts';
import chalk from 'chalk';

const logicCli = async (command: string | undefined, ...params: string[]) => {
  if (command === undefined) {
    CommandCLI.help();
    return;
  }
  try {
    CommandCLI.commands[command as CommandKey](...params);
  } catch {
    throw new Error(chalk.red.bold('Uncorrected command'));
  }
};


const [, , command, ...params] = process.argv;

logicCli(command, ...params);

