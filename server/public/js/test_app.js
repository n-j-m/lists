(function () {

  function auth (creds) {
    return fetch('/api/v1/auth/login', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        email: 'nick65@gmail.com',
        password: 'password'
      })
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          return Promise.resolve({ token: '' });
        }
        return res.json();
      })
      .catch((err) => console.error(err));
  }

  document.addEventListener('DOMContentLoaded', () => {
    auth()
      .then((auth) => {
        console.log('auth:', auth);
        const socket = io.connect('http://localhost:3000');

        socket.emit('authenticate', { token: auth.token.substr(4) })
          .on('authenticated', (data) => {
            console.log('authed:', data);
          })
          .on('token', (data) => console.log('token', data))
          .on('unauthorized', (data) => console.log('unauthed:', data));

        socket.on('connected', (msg) => {
          console.log('connected:', msg);
        });
        socket.on('disconnect', (msg) => console.log('disconnect', msg));
        socket.on('disconnected', (msg) => console.log('disconnected', msg));
      })
      .catch((err) => console.error(err));
  });
})();