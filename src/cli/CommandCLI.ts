import { version as appVersion } from '../../package.json';
import { writeFile} from 'node:fs';
import chalk from 'chalk';
import axios from 'axios';
import IOffer from '../interfaces/IOffer.ts';
import {readFile} from 'node:fs/promises';

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
    '--import': (...params: string[]) => {
      const [filePath] = params;
      this.importFile(filePath);
    },
    '--generate': (...params: string[]) => {
      const [countParams, pathSaveFile, pathUrl ] = params;
      this.generate(+countParams, pathSaveFile, pathUrl);
    },
  };

  public help(): void {
    console.log(chalk.bold(this.defaultText));
  }

  public version(): void {
    console.log(chalk.green(`Version app: ${appVersion}`));
  }

  public async importFile(filePath: string): Promise<IOffer | void> {
    let strData = '';
    try {
      const data = await readFile(filePath);
      strData = data.toString('utf-8');
    } catch (e) {
      throw new Error(chalk.red.bold('File error!'));
    }
    const offers: IOffer[] = [];
    for (const row of strData.split('\n')) {
      if (row.trim().length === 0) {
        continue;
      }
      const [name,
        description,
        datePublication,
        city,
        prevPicture,
        images,
        premium,
        favorite,
        rating,
        type,
        countRooms,
        countGuests,
        price,
        comfortable,
        author,
        countComments,
        location] = row.split('\t');
      const offer: IOffer = {
        name,
        description,
        datePublication: new Date(datePublication),
        city,
        prevPicture,
        images: images.split(','),
        rating: +rating,
        premium: JSON.parse(premium),
        favorite: JSON.parse(favorite),
        type,
        author,
        countComments: +countComments,
        location,
        countRooms: +countRooms,
        countGuests: +countGuests,
        price: +price,
        comfortable
      };
      offers.push(offer);
    }
    console.log(JSON.stringify(offers, null, 4));
    return offers;
  }

  public async generate(countOffers: number, pathSaveFile: string, pathUrl: string): Promise<void> {
    const { data: offers } = await axios.get<IOffer[]>(`${pathUrl}?_limit=${countOffers}`);
    if (countOffers > offers.length) {
      console.log(chalk.yellow.bold(`Max count offers ${offers.length}`));
    }
    const fileContent: string[] = [];
    for (const offer of offers) {
      for (const key of Object.keys(offer)) {
        fileContent.push(`${offer[key] }\t`);
      }
      fileContent.push('\n');
    }
    fileContent.pop();
    const fileName = `${pathSaveFile}/mocks.tsv`;
    writeFile(fileName, fileContent.join(''), (err) => {
      if (err) {
        throw new Error(chalk.red.bold(`File ${fileName} write error!`));
      }
    });
  }
}

export default new CommandCLI();
