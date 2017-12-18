'use strict';
const ElmsGenerator = require('../ElmsGenerator');

module.exports = class extends ElmsGenerator {
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your app?'
      },
      {
        type: 'input',
        name: 'description',
        message: 'What is the description of your app?'
      }
    ];

    return this.prompt(prompts).then(props => {
      props = Object.assign(props, {
        name: this.case().kebab(props.name),
        nameSnakeFormat: this.case().kebab(props.name)
      });
      this.answers = props;
    });
  }

  writing() {
    const name = this.answers.name;
    const nameSnakeFormat = this.answers.nameSnakeFormat;
    const destinationPath = this.destinationPath(`${this.APPS_PATH()}/${name}`);
    // Copy over all files but the dynamic ones
    this.fs.copyTpl(
      `${this.templatePath('_name')}/**/!(_)*`,
      destinationPath,
      this.answers
    );
    this.fs.copyTpl(
      this.templatePath('_name/test/_name/_name_test.html'),
      `${destinationPath}/test/${name}/${name}_test.html`,
      this.answers
    );
    this.fs.copyTpl(
      this.templatePath('_name/src/_name/_name.html'),
      `${destinationPath}/src/${name}/${name}.html`,
      this.answers
    );
    this.fs.copyTpl(
      this.templatePath('_name/_nameSnakeFormat.php'),
      `${destinationPath}/${nameSnakeFormat}.php`,
      this.answers
    );
  }

  installing() {
    const name = this.answers.name;
    const destinationPath = this.destinationPath(`${this.APPS_PATH()}/${name}`);
    // Install bower dependencies in new app.
    this.spawnCommandSync('bower', ['install'], { cwd: destinationPath });
  }
};
