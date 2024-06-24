const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

const postcodeRoutes = require('./routes/postcodeRoutes');
const authRoutes = require('./routes/authRoutes');
const registrationRoutes = require('./routes/registrationRoutes');

app.use(cors());
app.use(bodyParser.json());

app.use('/postcodes', postcodeRoutes);
app.use('/auth', authRoutes);
app.use('/registration', registrationRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
