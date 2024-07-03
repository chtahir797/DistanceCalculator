const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Import routes
const postcodeRoutes = require('./routes/postcodeRoutes');
const authRoutes = require('./routes/authRoutes');
const registrationRoutes = require('./routes/registrationRoutes');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname,'.','frontend')));

app.use('/postcodes', postcodeRoutes);
app.use('/auth', authRoutes);
app.use('/registration', registrationRoutes);

// Serve frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend','.','index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
