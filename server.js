const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON data
app.use(express.static(path.join(__dirname))); // Serve static files (for HTML)

// In-memory storage for bus data
let busData = {};
const valid_imei = ["1729", "2357"]

// Route to handle data from Arduino
app.post('/update', (req, res) => {
  const { imei, busNumber, latitude, longitude, timestamp } = req.body;
if (imei.includes(valid_imei)){
  if (!busNumber || !latitude || !longitude || !timestamp) {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  // Store the data for the respective bus
  busData[busNumber] = { latitude, longitude, timestamp };

  res.status(200).json({ message: 'Data updated successfully!' });
}
else{
  res.status(403).json({ error: 'Access Denied'});
}
});

// API to send bus data to the webpage
app.get('/data', (req, res) => {
  res.json(busData);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
