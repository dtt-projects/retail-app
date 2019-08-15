/**
 * @module tests/smoke.test.js
 * @fileoverview Ensure that base functionality for unit tests works.
 * @requires Mocha
 * @requires Chai
 * @exports {null} No tests exported.
 */

/* eslint-disable no-undef */

// External Dependencies
const mocha = require('mocha');
const chai = require('chai');


/**
 * Smoke test. Ensure that the libraries work as expected.
 */
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