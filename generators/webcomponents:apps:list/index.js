'use strict';
const ElmsGenerator = require('../ElmsGenerator');

module.exports = class extends ElmsGenerator {

  prompting() {
    // get the list of apps 
    return this.getApps()
    .then(apps => apps.map(app => {
      const appsPathlist =  this.__appsPathlist || {};
      const path = app;
      const shortname = app.slice(40)
      const appPathItem = {};
      appPathItem[shortname] = path;
      // store the original path for later
      this.__appsPathlist = Object.assign(appsPathlist, appPathItem);
      // trim the path to only show the app name
      return app.slice(40)
    }))
    .then((apps) => {
      return this.prompt([
        {
          type: 'list',
          name: 'app',
          message: 'Select the app you would like to perform an operation on.',
          choices: apps,
          pageSize: 40
        }
        ]).then((answers) => {
          this.answers = answers
        })
    })
  }

  writing() {
    if (this.env.operation === 'serve') {
      this.env.path = this.__appsPathlist[this.answers.app];
      this.composeWith(require.resolve('../webcomponents:serve'));
    }
  }
};
