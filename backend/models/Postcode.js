// const db = require('../config/database');

// class Postcode {
//     static getAll(callback) {
//         db.query('SELECT * FROM tbl_postcodes', callback);
//     }

//     static getById(id, callback) {
//         db.query('SELECT * FROM tbl_postcodes WHERE postcodeID = ?', [id], callback);
//     }

//     static create(data, callback) {
//         db.query('INSERT INTO tbl_postcodes SET ?', data, callback);
//     }

//     static update(id, data, callback) {
//         db.query('UPDATE tbl_postcodes SET ? WHERE postcodeID = ?', [data, id], callback);
//     }

//     static delete(id, callback) {
//         db.query('DELETE FROM tbl_postcodes WHERE postcodeID = ?', [id], callback);
//     }
// }

// module.exports = Postcode;





const db = require('../config/database');

class Postcode {
    static getAll(callback) {
        db.query('SELECT * FROM tbl_postcodes', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM tbl_postcodes WHERE postcodeID = ?', [id], callback);
    }

    static create(data, callback) {
        db.query('INSERT INTO tbl_postcodes SET ?', data, callback);
    }

    static update(id, data, callback) {
        db.query('UPDATE tbl_postcodes SET ? WHERE postcodeID = ?', [data, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM tbl_postcodes WHERE postcodeID = ?', [id], callback);
    }
}

module.exports = Postcode;
