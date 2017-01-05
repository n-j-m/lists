const sio = require('socket.io');
const socketJwt = require('socketio-jwt');
const debug = require('debug')('lists:socket');


const io = sio();


io.on('connection', socketJwt.authorize({
  secret: process.env.SECRET_KEY,
  timeout: 15000
})).on('authenticated', (socket) => {
  debug('token: %s', socket.decoded_token);
  socket.emit('token', { token: socket.decoded_token });
}).on('unauthorized', (err) => {
  debug('unauthed: %O', err);
});


module.exports = io;