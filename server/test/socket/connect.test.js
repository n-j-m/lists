const { expect } = require('chai');
const ioClient = require('socket.io-client');

const server = require('../server');

let sender = null, receiver = null;


describe('Connection', () => {

  beforeEach((done) => {
    server.start();

    sender = ioClient('http://localhost:3001');
    receiver = ioClient('http://localhost:3001');
    done();
  });

  afterEach((done) => {
    sender.disconnect();
    receiver.disconnect();
    server.stop();
    done();
  });


  it('should receive a connect event', (done) => {
    receiver.on('connect', (msg) => {
      expect(1).to.equal(1);
      done();
    });
  });

});
