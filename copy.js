#!/usr/bin/env node

import fs from "fs";
import path from "path";
import color from "picocolors";

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