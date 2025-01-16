import * as fs from 'fs';
import pkg from '../package.json' with { type: 'json' };

const readmePath = 'README.md';
const thisScriptPath = 'scripts/update-readme-versions.js';

const LAST_VERSION = '4.30.0'
const NEW_VERSION = pkg.version

function replaceOldVersionWithNew() {
  // For readme.
  const updatedReadmeContent = fs.readFileSync(readmePath, 'utf8').replaceAll(LAST_VERSION, NEW_VERSION);
  fs.writeFileSync(readmePath, updatedReadmeContent, 'utf8');

  // For this script.
  const updatedScriptContent = fs.readFileSync(thisScriptPath, 'utf8').replaceAll(LAST_VERSION, NEW_VERSION);
  fs.writeFileSync(thisScriptPath, updatedScriptContent, 'utf8');
}

replaceOldVersionWithNew()
