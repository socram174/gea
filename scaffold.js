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


const templates = {
  "ts": "./template-express-ts",
  "js": "./template-express-js"
};


// const scaffold = () => {
//     try {
//         // Initialize package.json
//         execSync('mkdir ' + defaultData.appName);

//         process.chdir('./' + defaultData.appName);

//         execSync('npm init -y');
        
//         // Read package.json
//         const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

//         // Configure package.json
//         packageJson.type = defaultData.type;
//         packageJson.description = defaultData.description;
//         packageJson.main = defaultData.main;
//         packageJson.scripts = defaultData.scripts;

//         // Add dependencias
//         packageJson.dependencies = defaultData.dependencies;

//         // Add dev dependencies
//         packageJson.devDependencies = defaultData.devDependencies;

//         console.log("✅ Configured package.json.");
//         //console.log(packageJson);

//         // Write updated package.json
//         fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

//         // Initialize tsconfig.json file
//         execSync('tsc --init');
//         console.log("✅ tsconfig.json created.");

//         // Create src directory and index.ts file
//         execSync('mkdir src && echo console.log(`Hello World!`); > src/index.ts');
//         console.log("✅ Created src directory and index.ts file.\n");

//         //console.log("✅ Las dependencias han sido añadidas a package.json!");
//         console.log("Execute the following commands to start the app:\n");// exe
//         console.log("cd " + defaultData.appName);
//         console.log("npm install");
//         console.log("npm run build");
//         console.log("npm start");

//     } catch (err) {
//         console.error( err.message);
//     }
// };

// scaffold();

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
    });
  
    if (isCancel(projectType)) {
      cancel('Operation cancelled');
      return process.exit(0);
    }
  
    const s = spinner();
    
    s.start('Initializing project');
    const templatePath = path.resolve(__dirname, templates[projectType]);
    const projectPath = path.resolve(`./${projectName}`);

    copyRecursiveSync(templatePath, projectPath);

    // // Initialize package.json
    // execSync('mkdir ' + projectName);
    // process.chdir('./' + projectName);
    // execSync('npm init -y');
  
    // await sleep(500);

    // s.message('Configuring package.json');
    // // Read package.json
    // const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

    // // Configure package.json
    // packageJson.type = defaultData.type;
    // packageJson.description = defaultData.description;
    // packageJson.main = defaultData.main;
    // packageJson.scripts = defaultData.scripts;

    // // Add dependencias
    // packageJson.dependencies = defaultData.dependencies;

    // // Add dev dependencies
    // packageJson.devDependencies = defaultData.devDependencies;

    // // Write updated package.json
    // fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

    // await sleep(500);
    // s.message('Creating tsconfig.json file');
    // // Initialize tsconfig.json file
    // execSync('tsc --init');

    // await sleep(500);
    // s.message('Creating project directory and index.ts file');
    // // Create src directory and index.ts file
    // execSync('mkdir src && echo console.log(`Hello World!`); > src/index.ts');
    
    // await sleep(500);
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
