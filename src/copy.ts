#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import color from 'picocolors';

export function copyRecursiveSync(src: string, dest: string) {
  // If folder exists, exit, else create it
  if (fs.existsSync(dest)) {
    console.log(color.red('Destination directory already exists. Aborting.'));
    process.exit(0);
  }
  fs.mkdirSync(dest);

  // Read all files in the source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  // Iterate over each file in the source directory
  entries.forEach((entry) => {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // If the file is a directory, recursively copy it
      copyRecursiveSync(srcPath, destPath);
    } else {
      // If it is a file, copy it
      fs.copyFileSync(srcPath, destPath);
    }
  });
}
