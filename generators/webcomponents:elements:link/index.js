fs = require('fs');

('use strict');
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
    // Convert the path to an array to find out how many
    // directorys we should travel up to get to core.
    const path = this.env.path;
    const pathArry = path.split('/');
    // Create a symlink prefix, ie: ../../../
    const symlinkPrifix =
      pathArry.length > 1 ? pathArry.map(i => '..').join('/') + '/' : '';
    const symlinkPath = symlinkPrifix + this.ELEMENTS_PATH();
    const destinationPath = this.destinationPath(path);
    if (fs.existsSync(destinationPath)) {
      const symlink = fs.symlinkSync(symlinkPath, `${destinationPath}/bower_components`);
      this.log(symlink);
    }
  }
};
