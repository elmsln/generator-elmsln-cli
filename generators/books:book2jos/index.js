'use strict';
const ElmsGenerator = require('../ElmsGenerator');
const drupal2jos = require('drupal-book-2-jos');
const fs = require('fs');
const Path = require('path');

module.exports = class extends ElmsGenerator {
  constructor(args, opts) {
    super(args, opts);
    this.option('path', {
      type: String,
      required: true
    });
    this.option('output', {
      type: String,
      required: true
    });
  }

  initializing() {
    if (this.options.path) {
      this.env.path = this.options.path;
    }
    if (this.options.output) {
      this.env.output = this.options.output;
    }
  }

  prompting() {
    let options = [];
    if (!this.env.path) {
      options.push({
        type: 'input',
        name: 'path',
        message: 'What is the full path to the book xml file?'
      });
    }
    if (!this.env.output) {
      options.push({
        type: 'input',
        name: 'output',
        message: 'Where would you like this file written?'
        // Default: this.generateOutputDefault()
      });
    }
    if (options.length > 0) {
      return this.prompt(options).then(answers => {
        for (let prop in answers) {
          if (answers[prop]) {
            this.env[prop] = answers[prop];
          }
        }
      });
    }
  }

  async installing() {
    const path = this.env.path;
    const output = this.env.output;
    const xml = fs.readFileSync(Path.join(path));
    const jos = await drupal2jos(xml);
    if (jos) {
      fs.writeFileSync(output, JSON.stringify(jos, null, 2));
    }
  }

  generateOutputDefault() {
    return 'hi';
  }
};
