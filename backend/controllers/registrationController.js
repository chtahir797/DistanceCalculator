const User = require('../models/User');

exports.register = (req, res) => {
    const { username, password } = req.body;

    // Check if username already exists
    User.getByUsername(username, (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ error: 'Error registering user' });
        }

        if (results.length > 0) {
            return res.status(409).json({ error: 'Username already exists' });
        }

        // Create new user
        User.create(username, password, (err, result) => {
            if (err) {
                console.error('Error creating user:', err);
                return res.status(500).json({ error: 'Error registering user' });
            }
            console.log('User registered successfully');
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
};
