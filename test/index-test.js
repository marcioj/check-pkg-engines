import semver from 'semver';
import chai from 'chai';
import path from 'path';
import { checkPkgEngines, commandVersion, getInstalledEnginesVersions } from '../src';

const expect = chai.expect;
var root = process.cwd();

describe('checkPkgEngines tests', function() {
  function moveToFixtureDir(name) {
    process.chdir(path.join(root, 'test', 'fixtures', name));
  }

  afterEach(function () {
    process.chdir(root);
  });

  it('matches with all installed engines', function() {
    moveToFixtureDir('project-with-engines');

    expect(checkPkgEngines({ node: '0.12.4', npm: '3.0.1' })).to.deep.equal({
      allValid: true,
      engines: [
        {
          name: 'node',
          installedVersion: '0.12.4',
          expectedSemver: '>=0.12',
          valid: true
        },
        {
          name: 'npm',
          installedVersion: '3.0.1',
          expectedSemver: '^3.0.0',
          valid: true
        }
      ]
    });
  });

  it('ignores non existent engines', function() {
    moveToFixtureDir('project-with-node-engine');

    expect(checkPkgEngines({ node: '0.12.4', npm: '3.0.1' })).to.deep.equal({
      allValid: true,
      engines: [
        {
          name: 'node',
          installedVersion: '0.12.4',
          expectedSemver: '>=0.12',
          valid: true
        }
      ]
    });
  });

  it('sets valid to false for engines that does not match', function() {
    moveToFixtureDir('project-with-engines');

    expect(checkPkgEngines({ node: '0.10.1', npm: '3.0.1' })).to.deep.equal({
      allValid: false,
      engines: [
        {
          name: 'node',
          installedVersion: '0.10.1',
          expectedSemver: '>=0.12',
          valid: false
        },
        {
          name: 'npm',
          installedVersion: '3.0.1',
          expectedSemver: '^3.0.0',
          valid: true
        }
      ]
    });
  });

  it('returns allValid true if there is no engines to check', function() {
    moveToFixtureDir('project-without-engines');

    expect(checkPkgEngines({ node: '0.10.1', npm: '3.0.1' })).to.deep.equal({
      allValid: true,
      engines: []
    });
  });

});

describe('commandVersion tests', function() {

  it('shows the command version', function () {
    expect(semver.valid(commandVersion('node'))).to.be.ok;
  });

  it('ignores not found commands', function () {
    expect(semver.valid(commandVersion('whatever'))).to.be.null;
  });

});

describe('getInstalledEnginesVersions tests', function() {

  it('shows the engines versions', function () {
    expect(getInstalledEnginesVersions()).to.have.keys('node', 'npm');
  });

});
