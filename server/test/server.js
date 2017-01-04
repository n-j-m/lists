require('dotenv').load();

const app = require('../app');
const http = require('http');
const io = require('../socket');


class TestServer {
  constructor () {
    this.server = null;
    this.running = false;
  }

  start () {
    if (this.running) {
      throw new Error('Server already running');
    }

    this.server = http.createServer(app);
    this.server.listen(process.env.PORT || 3000);
    io.attach(this.server);
  }

  stop () {
    if (this.running) {
      this.server.close();
      this.server = null;
      this.running = false;
    }
  }

}

module.exports = new TestServer();
