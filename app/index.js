"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
const yosay_1 = __importDefault(require("yosay"));
const utils_1 = require("./sources/utils");
const validate = __importStar(require("./sources/validators"));
const chalk_1 = __importDefault(require("chalk"));
class PackageGenerator extends yeoman_generator_1.default {
    constructor(args, opts) {
        super(args, opts);
        this.packageVersion = '1.0.0';
        this.appname = 'project-name';
        this.description = 'A simple description of your project';
        this.log(yosay_1.default(`Welcome to the amazing ${chalk_1.default.green('Truffle typescript generator')}`));
    }
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = [
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
            const answers = yield this.prompt(options);
            this.appname = answers.name;
            this.packageVersion = answers.version;
            this.author = answers.author;
            this.description = answers.description;
            this.repository = answers.repository;
        });
    }
    writing() {
        return __awaiter(this, void 0, void 0, function* () {
            // create directory
            this.destinationRoot(this.appname);
            // copy all files
            const files = yield utils_1.globPromise('**', {
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
            this.fs.copy(this.templatePath('_gitignore'), this.destinationPath('.gitignore'));
            this.fs.copy(this.templatePath('.solcover.js'), this.destinationPath('.solcover.js'));
            this.fs.copy(this.templatePath('.soliumrc.json'), this.destinationPath('.soliumrc.json'));
            this.fs.copy(this.templatePath('.soliumignore'), this.destinationPath('.soliumignore'));
            this.fs.copy(this.templatePath('.prettierrc'), this.destinationPath('.prettierrc'));
            this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), {
                appname: this.appname,
                description: this.description,
                repository: this.repository,
                author: this.author,
            });
            this.fs.copyTpl(this.templatePath('LICENSE.md'), this.destinationPath('LICENSE.md'), {
                author: this.author,
            });
        });
    }
    install() {
        return __awaiter(this, void 0, void 0, function* () {
            this.installDependencies({
                bower: false,
            });
        });
    }
}
module.exports = PackageGenerator;
