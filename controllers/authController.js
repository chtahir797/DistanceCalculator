const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { username, password } = req.body;
    User.getByUsername(username, (err, results) => {
        if (err) res.status(500).send(err);
        if (results.length === 0) return res.status(401).send('Invalid username or password');

        const user = results[0];
        bcrypt.compare(password, user.Password, (err, isMatch) => {
            if (err) res.status(500).send(err);
            if (!isMatch) return res.status(401).send('Invalid username or password');

            const token = jwt.sign({ id: user.userID }, 'secret_key', { expiresIn: '1h' });
            res.json({ token });
        });
    });
};
