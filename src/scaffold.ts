#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { copyRecursiveSync } from './copy.js';

import {
  intro,
  outro,
  confirm,
  select,
  spinner,
  isCancel,
  cancel,
  text,
} from '@clack/prompts';
import { setTimeout as sleep } from 'node:timers/promises';
import color from 'picocolors';
import { fileURLToPath } from 'url';

//console.log(process.argv);

// Obtener __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const defaultData = {
  appName: 'gexp-app',
};

type Template = 'ts' | 'js';

let projectName: string = defaultData.appName;

const templates2 = {
  ts: '../template-express-ts',
  js: '../template-express-js',
};

const templates = {
  ts: {
    path: '../template-express-ts',
    message: (pName: string) => {
      return `
      To start the app run:\n
      cd ${pName}
      npm install
      npm run build
      npm start    
      `;
    },
  },
  js: {
    path: '../template-express-js',
    message: (pName: string) => {
      return `
      To start the app run:\n
      cd ${projectName}
      npm install
      npm start    
      `;
    },
  },
};

async function main() {
  console.log();
  intro(color.inverse('Generate express app!'));

  projectName = (await text({
    message: 'Project name:',
    placeholder: 'express-app',
    defaultValue: defaultData.appName,
  })) as string;

  if (isCancel(projectName)) {
    cancel('Operation cancelled');
    return process.exit(0);
  }

  const projectType = (await select({
    message: 'Pick a project type.',
    options: [
      { value: 'ts', label: 'TypeScript' },
      { value: 'js', label: 'JavaScript' },
    ],
  })) as Template;

  if (isCancel(projectType)) {
    cancel('Operation cancelled');
    return process.exit(0);
  }

  const s = spinner();

  s.start('Initializing project');
  const templatePath = path.resolve(__dirname, templates[projectType].path);
  const projectPath = path.resolve(`./${projectName}`);

  copyRecursiveSync(templatePath, projectPath);

  s.stop('Youre all set!');

  outro(templates[projectType].message(projectName));
}

main().catch(console.error);
