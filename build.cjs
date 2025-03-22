const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const minifyHtml = require('@minify-html/node');
const { Buffer } = require('node:buffer');

const inputFile = 'index.html.ejs';
const tempDir = 'temp';
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

esbuild.buildSync({
  entryPoints: [
    './scripts/icon.js',
    './scripts/capture.js',
  ],
  outdir: 'temp',
  bundle: true,
  minify: true,
});

const scripts = transformFiles(path.resolve(__dirname, tempDir), 'js', {format: 'iife'});
const styles = transformFiles(path.resolve(__dirname, 'styles'), 'css');

fs.mkdirSync(outputDir, {recursive: true});
ejs.renderFile(inputFile, {scripts, styles})
  .then((index) => {
    fs.writeFileSync(`${outputDir}/${outputFile}`, minifyHtml.minify(Buffer.from(index), {}));
  });
