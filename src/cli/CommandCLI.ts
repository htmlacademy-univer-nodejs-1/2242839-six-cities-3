import { version as appVersion } from '../../package.json';
import { readFile } from 'node:fs';
import chalk from 'chalk';

class CommandCLI {
  private readonly defaultText: string = [
    '--version:                   # выводит номер версии',
    '--help:                      # печатает этот текст',
    '--import <path>:             # импортирует данные из TSV',
    '--generate <n> <path> <url>  # генерирует произвольное количество тестовых данных',
  ].join('\n');

  public readonly commands = {
    '--version': () => this.version(),
    '--help': () => this.help(),
    '--import': () => this.importFile(),
    '--generate': () => ({}),
  };

  public help(): void {
    console.log(chalk.bold(this.defaultText));
  }

  public version(): void {
    console.log(chalk.green(`Version app: ${appVersion}`));
  }

  public importFile(): void {
    readFile('./src/cli/mocks/mocks.tsv', (err, data) => {
      if (err) {
        return console.log(chalk.red.bold('File error!'));
      }
      const convertData = data.toString('utf-8');
      console.log(convertData);
    });
  }
}

export default new CommandCLI();
