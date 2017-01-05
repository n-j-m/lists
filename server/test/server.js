require('dotenv').load();

const app = require('../app');
const http = require('http');
const io = require('../socket');

const jwt = require('jsonwebtoken');


class TestServer {
  constructor () {
    this.server = null;
    this.running = false;
  }

  start () {
    return new Promise((resolve, reject) => {
      if (this.running) {
        reject(new Error('Server already running'));
      }
      else {
        this.server = http.createServer(app);
        this.server.listen(process.env.PORT || 3000, () => {
          io.attach(this.server);
          resolve();
        });
      }
    });
  }

  stop () {
    return new Promise((resolve) => {
      if (this.server) {
        this.server.close(() => {
          this.running = false;
          resolve();
        });
      }
    });
  }

  getToken () {
    const token = jwt.sign({ email: 'test@example.com' }, process.env.SECRET_KEY, { expiresIn: "20 seconds" });
    return token;
  }

}

module.exports = new TestServer();
