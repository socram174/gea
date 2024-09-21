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

const defaultData= {
    type: "module",
    description: "Base express-ts app",
    main: "index.js",
    scripts: {
        start: "node src/index.js",
        build: "tsc"
    },
    dependencies: {
        express: "^4.21.0"
    },
    devDependencies: {
        typescript: "^5.6.2",
        "@types/node": "^22.5.4"
    },
    appName: "express-ts"
}


type Template = "ts" | "js";

const templates = {
  "ts": "../template-express-ts",
  "js": "../template-express-js"
};

async function main() {
    console.log();
    intro(color.inverse('Generate express app!'));
  
    const projectName = await text({
      message: 'Project name:',
      placeholder: 'express-app',
      defaultValue: defaultData.appName,
    });
  
    if (isCancel(projectName)) {
      cancel('Operation cancelled');
      return process.exit(0);
    }
  
    const projectType = await select({
      message: 'Pick a project type.',
      options: [
        { value: 'ts', label: 'TypeScript' },
        { value: 'js', label: 'JavaScript' },
      ],
    }) as Template;

  
    if (isCancel(projectType)) {
      cancel('Operation cancelled');
      return process.exit(0);
    }
  
    const s = spinner();
    
    s.start('Initializing project');
    const templatePath = path.resolve(__dirname, templates[projectType]);
    const projectPath = path.resolve(`./${projectName}`);



    copyRecursiveSync(templatePath, projectPath);

    s.stop('Youre all set!');
  
    outro(`
    To start the app run:\n
    cd ${projectName}
    npm install
    npm run build
    npm start    
    `);
  
  }
  
  main().catch(console.error);
