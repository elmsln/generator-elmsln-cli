'use strict';

const ElmsGenerator = require('../ElmsGenerator');

module.exports = class extends ElmsGenerator {
  initializing() {
  }

  prompting() {
    // get the list of elements 
    return this.getElements()
    // trim the path to only show the element name
    .then(elements => elements.map(el => el.slice(44)))
    .then((elements) => {
      return this.prompt([
        {
          type: 'list',
          name: 'operation',
          message: 'Select the elements.',
          choices: elements,
          pageSize: 40
        }
        ]).then((answers) => {
          this.answers = answers
        })
   })
  }
};
