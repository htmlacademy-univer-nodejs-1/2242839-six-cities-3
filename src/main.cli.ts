#!/usr/bin/env node
import 'reflect-metadata';
import {CLIApplication, GenerateCommand, HelpCommand, ImportCommand, VersionCommand} from './cli';

(() => {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);

  cliApplication.processCommand(process.argv);
})();
