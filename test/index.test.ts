import helpers = require('yeoman-test');
import assert = require('yeoman-assert');
import path from 'path';

describe('truffle-ts-generator', () => {
  beforeEach(async () => {
    await helpers.run(path.join(__dirname, '../app')).withPrompts({
      author: 'Edson',
      description: 'description',
      name: 'package-test',
      repository: 'http://repository',
    });
  });

  it('should generate a project with package.json', async () => {
    assert.file(['package.json']);
    assert.jsonFileContent('package.json', { author: 'Edson' });
    assert.jsonFileContent('package.json', { description: 'description' });
    assert.jsonFileContent('package.json', { name: 'package-test' });
    assert.jsonFileContent('package.json', {
      repository: { type: 'git', url: 'http://repository' },
    });
  });

  it('should generate a project with correct files', async () => {
    assert.file(['contracts']);
    assert.file(['migrations']);
    assert.file(['test']);
    assert.file(['types']);
    assert.file(['.gitignore']);
    assert.file(['.prettierrc']);
    assert.file(['.solcover.js']);
    assert.file(['.soliumignore']);
    assert.file(['.soliumrc.json']);
    assert.file(['LICENSE.md']);
    assert.file(['package.json']);
    assert.file(['README.md']);
    assert.file(['truffle.js']);
    assert.file(['tsconfig.json']);
    assert.file(['tslint.json']);
  });
});
