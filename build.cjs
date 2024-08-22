const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const inputFile = 'index.html.ejs';
const outputDir = 'dist';
const outputFile = 'dssc.html';

/**
 * run esbuild transform on all files in the directory
 * @param {string} dir 
 * @param {string} loader
 * @param {Object} options
 */
function transformFiles(dir, loader, options = {}) {
  return fs.readdirSync(dir).map((fileName) => {
    const file = fs.readFileSync(path.resolve(dir, fileName));
    return esbuild.transformSync(file, {
      loader,
      minify: true,
      ...options
    }).code.trimEnd();
  });
}

const scripts = transformFiles(path.resolve(__dirname, 'scripts'), 'js', {format: 'iife'});
const styles = transformFiles(path.resolve(__dirname, 'styles'), 'css');

fs.mkdirSync(outputDir, {recursive: true});
ejs.renderFile(inputFile, {scripts, styles})
  .then((index) => {
    fs.writeFileSync(`${outputDir}/${outputFile}`, index);
  });
