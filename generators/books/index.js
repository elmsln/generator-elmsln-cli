'use strict';
const ElmsGenerator = require('../ElmsGenerator');

module.exports = class extends ElmsGenerator {
  prompting() {
    return this.prompt([
      {
        type: 'list',
        name: 'operation',
        message: 'What opperation would you like to perform?',
        choices: ['Convert Book to JSON Outline Schema']
      }
    ]).then(answers => {
      this.answers = answers;
    });
  }

  writing() {
    if (this.answers.operation === 'Convert Book to JSON Outline Schema') {
      this.composeWith(require.resolve('../books:book2jos'));
    }
  }
};
