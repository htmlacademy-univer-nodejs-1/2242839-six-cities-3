import CommandCLI from './CommandCLI.ts';
import {CommandKey} from './CommandKey.ts';
import chalk from 'chalk';

const logicCli = (command: string | undefined, ...params: string[]) => {
  if (command == null) {
    CommandCLI.help();
    return;
  }

  try {
    CommandCLI.commands[command as CommandKey]();
  } catch {
    console.log(chalk.red.bold('Uncorrected command'));
  }
};


const [, , command, ...params] = process.argv;

logicCli(command, ...params);

