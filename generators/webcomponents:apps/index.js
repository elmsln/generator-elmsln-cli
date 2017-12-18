'use strict';
const ElmsGenerator = require('../ElmsGenerator');

module.exports = class extends ElmsGenerator {

  prompting() {
    return this.prompt([
      {
        type: 'list',
        name: 'operation',
        message: 'What opperation would you like to perform?',
        choices: [
          'Create new app',
          'List Apps',
          'Serve App',
        ]
      }
    ]).then((answers) => {
      this.answers = answers
    })
  }

  writing() {
    if (this.answers.operation === 'Create new app') {
      this.composeWith(require.resolve('../webcomponents:apps:new'));
    }
    if (this.answers.operation === 'List Apps') {
      this.composeWith(require.resolve('../webcomponents:apps:list'));
    }
    if (this.answers.operation === 'Serve App') {
      this.env.operation = 'serve';
      this.composeWith(require.resolve('../webcomponents:apps:list'));
    }
  }
};
