import Generator from 'yeoman-generator';
import yosay from 'yosay';
import { globPromise } from './sources/utils';
import * as validate from './sources/validators';
import chalk from 'chalk';

class PackageGenerator extends Generator {
  packageVersion: string = '1.0.0';
  author?: string;
  repository?: string;
  constructor(args: string | string[], opts: {}) {
    super(args, opts);
    this.appname = 'project-name';
    this.description = 'A simple description of your project';
    this.log(yosay(`Welcome to the amazing ${chalk.green('Truffle typescript generator')}`));
  }

  async prompting(): Promise<void> {
    const options: Generator.Questions = [
      {
        name: 'name',
        default: this.appname,
        type: 'input',
        message: 'Project name:',
        validate: validate.requiredFor(`Project name (${this.appname})`),
      },
      {
        name: 'version',
        default: this.packageVersion,
        type: 'input',
        message: 'Project version:',
        validate: validate.requiredFor(`Project version (${this.packageVersion})`),
      },
      {
        name: 'description',
        type: 'input',
        message: 'Project description:',
        validate: validate.requiredFor('Project description'),
      },
      {
        name: 'author',
        default: this.author,
        type: 'input',
        message: 'Author:',
        validate: validate.requiredFor('Author'),
      },
      {
        name: 'repository',
        default: this.repository,
        type: 'input',
        message: 'Git repository:',
      },
    ];

    const answers = await this.prompt(options);
    this.appname = answers.name;
    this.packageVersion = answers.version;
    this.author = answers.author;
    this.description = answers.description;
    this.repository = answers.repository;
  }

  async writing(): Promise<void> {
    // create directory
    this.destinationRoot(this.appname);

    // copy all files
    const files = await globPromise('**', {
      cwd: this.sourceRoot(),
      ignore: ['_gitignore'],
    });

    files.forEach(file => {
      this.fs.copyTpl(this.templatePath(file), this.destinationPath(file), this);
    });

    this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), {
      appname: this.appname,
      description: this.description,
    });

    this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));

    this.fs.copy(this.templatePath('.solcover.js'), this.destinationPath('.solcover.js'));

    this.fs.copy(this.templatePath('.soliumrc.json'), this.destinationPath('.soliumrc.json'));

    this.fs.copy(this.templatePath('.soliumignore'), this.destinationPath('.soliumignore'));

    this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), {
      appname: this.appname,
      description: this.description,
      repository: this.repository,
      author: this.author,
    });

    this.fs.copyTpl(this.templatePath('LICENSE.md'), this.destinationPath('LICENSE.md'), {
      author: this.author,
    });
  }

  async install(): Promise<void> {
    this.installDependencies({
      bower: false,
    });
  }
}

export = PackageGenerator;
