'use strict';
const ElmsGenerator = require('../ElmsGenerator');

module.exports = class extends ElmsGenerator {
  prompting() {
    // Get the list of apps
    return this.getApps()
      .then(apps =>
        apps.map(app => {
          const appsPathlist = this.__appsPathlist || {};
          const path = app;
          const name = app.split('/').pop();
          const appPathItem = {};
          appPathItem[name] = path;
          // Store the original path for later
          this.__appsPathlist = Object.assign(appsPathlist, appPathItem);
          // Trim the path to only show the app name
          return name;
        })
      )
      .then(apps => {
        return this.prompt([
          {
            type: 'list',
            name: 'app',
            message: 'Select the app you would like to perform an operation on.',
            choices: apps,
            pageSize: 40
          }
        ]).then(answers => {
          this.answers = answers;
        });
      });
  }

  writing() {
    // set the path variable by getting the full path and chopping
    // off the destinationPath() so we have a relative version of the
    // path from the elmsln root directory.
    this.env.path = (this.__appsPathlist[this.answers.app]).replace(`${this.destinationPath()}/`, '');
    // send along the name variable
    this.env.name = this.answers.app;

    // the operation was set in webcomponents:apps
    if (this.env.operation === 'serve') {
      this.composeWith(require.resolve('../webcomponents:serve'));
    }
    if (this.env.operation === 'vagrant_push') {
      this.composeWith(require.resolve('../vagrant:push'));
    }
  }
};
