#!/usr/bin/env node

process.title = 'check-pkg-dependencies';

import { getInstalledEnginesVersions, checkPkgEngines } from '../';

let result = checkPkgEngines(getInstalledEnginesVersions());
if (!result.allValid) {
  console.log('Incompatible engines versions, please update them to the requested version especified in package.json engines field');
  for (let engine of result.engines) {
    if (!engine.valid) {
      console.log(`The current ${engine.name} version is ${engine.installedVersion} but package.json engines.${engine.name} field needs ${engine.expectedSemver}`);
    }
  }
  process.exit(1);
}
