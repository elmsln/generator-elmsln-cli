// @ts-check

'use strict';
const ElmsGenerator = require('../ElmsGenerator');
const drupal2jos = require('drupal-book-2-jos');
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
        message: 'Where would you like this file written?',
        default: answers => {
          const path = this.env.path || answers.path;
          if (path) {
            return Path.dirname(path);
          }
          return './';
        }
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
    const xml = this.fs.read(Path.join(path));
    // Get the jos from the xml file
    let jos = await drupal2jos(xml);
    // Format the jos to include a location if it doesn't already have one.
    // we'll use the item id since we know it's unique
    jos.items = jos.items.map(item => {
      return Object.assign({}, item, { location: item.location || `${item.id}.html` });
    });
    if (jos) {
      // Loop through each of the items and create files
      for (let item of jos.items) {
        this.fs.write(Path.join(output, item.location), item.body);
      }
      // Remove the body information from the outline
      jos.items = jos.items.map(item => {
        delete item.body;
        return item;
      });
      // Write the outline.json
      this.fs.write(Path.join(output, 'outline.json'), JSON.stringify(jos, null, 2));
    }
  }
};
