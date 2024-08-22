const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { WebSocketServer } = require('ws');
const matchRoutes = require("./routes/matchRoutes");
const connectDB = require('../src/config/db'); // Import the connect function from db.js

dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());
app.use('/api/matches', matchRoutes);

// Connect to MongoDB using the external db.js file
connectDB()
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('MongoDB connection error:', error));

wss.on('connection', (ws) => {
  console.log('New client connected');
  ws.on('message', (message) => {
    console.log('Received:', message);
  });
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
