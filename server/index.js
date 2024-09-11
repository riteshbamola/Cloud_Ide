const http = require('http');
const fs = require('fs').promises;
const os = require('os');
const express = require('express');
const { Server: SocketServer } = require('socket.io');
const pty = require('node-pty');
const path = require('path');
const fileRoutes = require('./routes/files')
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const chokidar = require('chokidar');
const { fstat } = require('fs');



const userDirectory = path.join(process.env.INIT_CMD || process.cwd(), 'user');

const ptyProcess = pty.spawn('bash', [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: userDirectory,
  env: process.env
});

const io = new SocketServer(server, {
  cors: { origin: "*" },
});

app.use(cors());
io.attach(server);

chokidar.watch('./user').on('all', (event, path) => {
  io.emit('file:refresh', path);
});
ptyProcess.onData((data) => {
  io.emit('terminal:data', data);
});

io.on('connection', (socket) => {
  console.log(`Socket Connected ${socket.id}`);
  socket.on('terminal:write', (data) => {
    ptyProcess.write(data);
  });
  socket.on('file:change', async ({ path, content }) => {
    console.log(path);
    await fs.writeFile(`./${path}`, content, () => console.log(`file written to ${path}`))
  });
});
app.use('/user', fileRoutes);

server.listen(9000, '0.0.0.0', () => console.log("🐋 Docker server running on port 9000"));
