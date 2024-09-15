#!/usr/bin/env node

import fs from "fs";
import path from "path";
import color from "picocolors";

// const data = {
//     appName: "my-app",
//     template: "express-ts"
// }

// const copy = () => {
//     if (!fs.existsSync(data.appName)) {
//         fs.mkdirSync(data.appName);
//       }
//     try {
//         fs.copyFileSync(`./${data.template}/package.json`, `./${data.appName}/package.json`);
//         console.log("✅ package.json copiado correctamente!");

//         fs.copyFileSync(`./${data.template}/tsconfig.json`, `./${data.appName}/tsconfig.json`);
//         console.log("✅ tsconfig.json copiado correctamente!");

//         fs.copyFileSync(`./${data.template}/src/index.ts`, `./${data.appName}/src/index.ts`);
//         console.log("✅ index.ts copiado correctamente!");
//     } catch (error) {
//         console.error(error);
//     }
// }

// copy();

// const entries = fs.readdirSync("./express-ts", { withFileTypes: true });
// console.log(entries);
// console.log(entries[1].isDirectory());

export function copyRecursiveSync(src, dest) {
  // If folder exists, exit, else create it
  if (fs.existsSync(dest)) {
    console.log(color.red("Destination directory already exists. Aborting."));
    process.exit(0);
  }
  fs.mkdirSync(dest);

  // Leemos todos los archivos y carpetas en la carpeta origen
  const entries = fs.readdirSync(src, { withFileTypes: true });

  // Iteramos sobre cada archivo o carpeta
  entries.forEach((entry) => {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Si es una carpeta, la copiamos recursivamente
      copyRecursiveSync(srcPath, destPath);
    } else {
      // Si es un archivo, lo copiamos directamente
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// // Ruta de la carpeta origen
// const sourceDir = "./template-express-ts";
// // Ruta de la carpeta destino
// const destinationDir = "./prueba-jajaxdw";

// // Ejecutar la función para copiar
// copyRecursiveSync(sourceDir, destinationDir);

// console.log("Archivos copiados con éxito.");
