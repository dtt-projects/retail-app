/**
 * @module tests/smoke.test.js
 * @fileoverview Ensure that base functionality for unit tests works.
 * @requires Mocha
 */

// External Dependencies
const mocha = require('mocha');
const chai = require('chai');


describe('Smoke test', () => {
  it('chai expects work as expected', () => {
    chai.expect(true).to.equal(true);
  });

  it('assertions still work', () => {
    chai.assert(1 === 1);
  });

  it('unequal values should not be equal', () => {
    chai.expect(1).to.not.equal('1');
  });
})