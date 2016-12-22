const { Server } = require('hapi');

const server = new Server();

server.connection({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || '3000',
});

module.exports = server;
