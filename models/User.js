
const db = require('../config/database');
const bcrypt = require('bcrypt');

class User {
    static getByUsername(username, callback) {
        db.query('SELECT * FROM tbl_users WHERE Username = ?', [username], callback);
    }

    static create(username, password, callback) {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return callback(err);
            }
            db.query('INSERT INTO tbl_users (Username, Password) VALUES (?, ?)', [username, hashedPassword], callback);
        });
    }
}

module.exports = User;

