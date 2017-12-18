'use strict';
const ElmsGenerator = require('../ElmsGenerator');

module.exports = class extends ElmsGenerator {

  prompting() {
    return this.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'What type of app would you like to create?',
        choices: [
          'Polymer'
        ]
      }
    ]).then((answers) => {
      this.answers = answers
    })
  }

  writing() {
    if (this.answers.type === 'Polymer') {
      this.composeWith(require.resolve('../webcomponents:apps:new:polymer'));
    }
  }
};
