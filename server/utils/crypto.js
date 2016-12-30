const crypto = require('crypto');

function getSalt (password) {
  return password.substr(0, password.lastIndexOf(':'));
}

const SALT_LENGTH = process.env.SALT_LENGTH || 64;
function generateSalt (length) {
  return crypto.randomBytes(length).toString('base64');
}

function generatePasswordHash (password, salt) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 512, 'sha512', (err, key) => {
      if (err) { reject(err); }
      else { resolve(`${salt}:${key.toString('base64')}`)}
    });
  });
}

function hashPassword (password) {
  const salt = generateSalt(SALT_LENGTH);
  return generatePasswordHash(password, salt);
}

module.exports = {
  getSalt,
  generatePasswordHash,
  hashPassword
};