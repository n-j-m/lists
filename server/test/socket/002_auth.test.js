const { expect } = require('chai');
const ioClient = require('socket.io-client');

const server = require('../server');

let sender = null, receiver = null;

const url = `http://localhost:${process.env.PORT}`;

let testToken = null;


describe('Client Authentication', () => {

  beforeEach(function (done) {
    server.start()
      .then(() => {
        sender = ioClient(url);
        receiver = ioClient(url);
        done();
      });
  });

  afterEach(function (done) {
    sender.disconnect();
    receiver.disconnect();
    server.stop().then(done);
  });

  it('should receive unauthorized event when no credentials are supplied', (done) => {
    const socket = sender.connect(url)
    
    socket.emit('authenticate', { token: 'bogus' })
      .on('unauthorized', (msg) => {
        expect(msg).to.exist;
        done();
      });
  });

  it('should receive unauthorized event when invalid credentials are supplied', (done) => {
    const socket = sender.connect(url)
    
    socket.emit('authenticate', { token: 'bogus' })
      .on('unauthorized', (msg) => {
        expect(msg).to.exist;
        done();
      });
  });

  it('should receive authenticated event when valid credentials are supplied', (done) => {
    const token = server.getToken();
    const socket = sender.connect(url)
    
    socket.emit('authenticate', { token })
      .on('authenticated', (msg) => {
        done();
      });
  });

});
