import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import { createInitialState, scrollRight, scrollLeft, select, getDisplayOptions } from './state.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? process.env.ORIGIN || '*' : '*',
    methods: ['GET', 'POST']
  }
});

let appState = createInitialState();

io.on('connection', (socket) => {
  socket.emit('state:update', {
    ...appState,
    options: getDisplayOptions(appState)
  });

  socket.on('action:scroll-left', () => {
    appState = scrollLeft(appState);
    io.emit('state:update', {
      ...appState,
      options: getDisplayOptions(appState)
    });
  });

  socket.on('action:scroll-right', () => {
    appState = scrollRight(appState);
    io.emit('state:update', {
      ...appState,
      options: getDisplayOptions(appState)
    });
  });

  socket.on('action:select', () => {
    appState = select(appState);
    io.emit('state:update', {
      ...appState,
      options: getDisplayOptions(appState)
    });
  });
});

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
