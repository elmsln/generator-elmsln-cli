'use strict';
const ElmsGenerator = require('../ElmsGenerator');

module.exports = class extends ElmsGenerator {
  prompting() {
    return this.prompt([
      {
        type: 'list',
        name: 'operation',
        message: 'What opperation would you like to perform?',
        choices: ['Push files to Vagrant']
      }
    ]).then(answers => {
      this.answers = answers;
    });
  }

  writing() {
    if (this.answers.operation === 'Push files to Vagrant') {
      this.composeWith(require.resolve('../webcomponents:vagrant:push'));
    }
  }
};
