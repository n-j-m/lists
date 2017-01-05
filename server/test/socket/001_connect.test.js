const { expect } = require('chai');
const ioClient = require('socket.io-client');

const server = require('../server');

let sender = null, receiver = null;

const url = `http://localhost:${process.env.PORT}`


describe('Connection', () => {

  beforeEach((done) => {
    server.start();

    sender = ioClient(url);
    receiver = ioClient(url);
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
