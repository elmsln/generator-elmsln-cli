'use strict';
const ElmsGenerator = require('../ElmsGenerator');
const fs = require('fs');

module.exports = class extends ElmsGenerator {
  constructor(args, opts) {
    super(args, opts);
    this.option('name', {
      type: String,
      required: true
    });
  }

  initializing() {
    if (this.options.name) {
      this.env.name = this.options.name;
    }
  }

  prompting() {}

  end() {
    const name = this.env.name;
    const symlinks = fs.symlinkSync(
      `../../../../../../../webcomponents/apps/${name}/src/${name}`,
      `core/dslmcode/shared/drupal-7.x/libraries/webcomponents/polymer/apps-src/${name}`
    );
    this.log(symlinks);
  }
};
