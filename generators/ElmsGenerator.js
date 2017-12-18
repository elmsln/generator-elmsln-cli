'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const glob = require('glob');
const Case = require('case');

module.exports = class extends Generator {
  /**
   * @todo use the new `static get const ()` method
   * in node v8
   */
  APPS_PATH() {
    return 'core/webcomponents/apps';
  }
  ELEMENTS_PATH() {
    return 'core/webcomponents/elements';
  }

  // Get a list of all bower imports .
  getApps() {
    return new Promise((resolve, reject) => {
      glob(this.destinationPath(`${this.APPS_PATH()}/*`), (err, value) => {
        if (err) reject(err);
        resolve(value);
      });
    });
  }

  // Get a list of all bower imports .
  getElements() {
    return new Promise((resolve, reject) => {
      glob(this.destinationPath(`${this.ELEMENTS_PATH()}/**/*.html`), (err, value) => {
        if (err) reject(err);
        resolve(value);
      });
    });
  }

  getElementsImportFiles() {
    return new Promise((resolve, reject) => {
      glob(this.destinationPath(`${this.ELEMENTS_PATH()}/**/*.html`), (err, value) => {
        if (err) reject(err);
        resolve(value);
      });
    });
  }

  // empty an array of files
  emptyFiles(files) {
    var cleanFiles = files.map(file => this.fs.write(file, ' '));
    return cleanFiles;
  }

  // Access the Case library
  case() {
    return Case;
  }
};
