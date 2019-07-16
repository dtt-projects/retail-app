/**
 * @module tests/homepage.test.js
 * @fileoverview Test module for the homepage route(s).
 * @requires Mocha
 */

// External Dependencies
const mocha = require('mocha');
const chai = require('chai');
const fetch = require('node-fetch');
let chaiHttp = require('chai-http');

// Internal Dependencies
const http = require('http');
const app = require('../app');

let should = chai.should();
let server;
let port;
let homepageResponse;
let homepageContent;

// Configure Chai
chai.use(chaiHttp);


describe('Homepage server', function() {
  before(function(done) {
    server = http.createServer(app);
    port = 3001;

    server.listen(port);

    fetch('http://localhost:3001')
      .then((res) => {
        homepageContent = res.text;
        homepageResponse = res.status;
        done();
      });
  });

  it('should send back a 200 status code', function(done) {
    chai.expect(homepageResponse).to.equal(200);
    done();
  });

  it ('Should have HTML content', function(done) {
    chai.expect(homepageContent).to.be.not.null;
    done();
  });

  after(function() {
    server.close();
  });
})