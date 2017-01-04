const sio = require('socket.io');
const socketJwt = require('socketio-jwt');


const io = sio();


io.on('connection', socketJwt.authorize({
  secret: process.env.SECRET_KEY,
  timeout: 15000
})).on('authenticated', (socket) => {
  console.log('token:', socket.decoded_token);
  socket.emit('token', { token: socket.decoded_token });
});


module.exports = io;