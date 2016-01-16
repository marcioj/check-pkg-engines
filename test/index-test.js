import chai from 'chai';
import checkPkgEngines from '../src';

const expect = chai.expect;

describe('check-pkg-engines tests', function() {

  it('works', function() {
    expect(checkPkgEngines()).to.equal('stuff');
  });

});
