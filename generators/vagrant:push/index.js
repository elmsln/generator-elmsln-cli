'use strict';
const ElmsGenerator = require('../ElmsGenerator');

module.exports = class extends ElmsGenerator {
  constructor(args, opts) {
    super(args, opts);
    this.option('path', {
      type: String,
      required: true
    });
  }

  initializing() {
    if (this.options.path) {
      this.env.path = this.options.path;
    }
  }

  prompting() {}

  installing() {
    const path = this.env.path;
    // Convert the path to an array so we can take off the last directory
    let d = `:/home/vagrant/elmsln/${path}`;
    d = d.split('/');
    d.pop();
    d = d.join('/');
    const destination = d;
    const source = path;
    this.log({
      source: source,
      destination: destination
    });
    const command = this.spawnCommandSync('rsync', [
      '-r',
      '--links',
      source,
      destination
    ]);
    this.log(command);
  }
};
