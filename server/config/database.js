const path = require('path');

if (process.env.NODE_ENV !== 'production' && !process.env.DOTENV) {
  require('dotenv').load();
}

module.exports = {
  "development": {
    "dialect": "sqlite",
    "storage": path.resolve(process.env.BASE_DIR || __dirname, 'dev.sqlite3')
  },
  "test": {
    "dialect": "sqlite",
    "storage": ":memory:"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
