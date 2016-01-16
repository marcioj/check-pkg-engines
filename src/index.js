import childProcess from 'child_process';
import semver from 'semver';
import readPkg from 'read-pkg';

export function commandVersion(name) {
  try {
    return childProcess.execSync(name + ' -v', { stdio: 'pipe' }).toString().trim();
  } catch(e) {
    let output = e.output.toString();
    // ignore command not found
    /* istanbul ignore next */
    if (output.indexOf('command not found') === -1) {
      throw e;
    }
  }
}

export function getInstalledEnginesVersions() {
  return {
    npm: commandVersion('npm'),
    node: commandVersion('node')
  };
}

export function checkPkgEngines(checkVersions) {
  let pkgJson = readPkg.sync();
  let engines = (pkgJson.engines || {});

  if (!Object.keys(engines).length) {
    return { allValid: true, engines: [] };
  }

  let result = [];

  for (let engine in checkVersions) {
    if (!engines.hasOwnProperty(engine)) { continue; }
    let installedVersion = checkVersions[engine];
    let expectedSemver = engines[engine];
    let valid = semver.satisfies(installedVersion, expectedSemver);

    result.push({
      name: engine,
      installedVersion,
      expectedSemver,
      valid
    });
  }

  let allValid = result.every(_=>_.valid);

  return {
    allValid,
    engines: result
  };
}
