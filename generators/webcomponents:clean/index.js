'use strict';
const ElmsGenerator = require('../ElmsGenerator');

module.exports = class extends ElmsGenerator {
  prompting() {
    return this.prompt([
      {
        type    : 'confirm',
        name    : 'confirm',
        message : 'Are you sure you want to clean up the bower components?'
      }
    ]).then((answers) => {
      this.options.confirm = answers.confirm;
    });
  }

  writing() {
    // make sure the user confirmed the operation.
    if (this.options.confirm !== true) return;

    // Clean the files
    const clean = this.getElementsImportFiles().then(files => this.emptyFiles(files));
    clean.then(() => this.log('Files have been cleaned'));
  }
};
