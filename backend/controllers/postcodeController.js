// const Postcode = require('../models/Postcode');

// exports.getAllPostcodes = (req, res) => {
//     Postcode.getAll((err, results) => {
//         if (err) res.status(500).send(err);
//         res.json(results);
//     });
// };

// exports.getPostcodeById = (req, res) => {
//     Postcode.getById(req.params.id, (err, results) => {
//         if (err) res.status(500).send(err);
//         res.json(results[0]);
//     });
// };

// exports.createPostcode = (req, res) => {
//     const data = req.body;
//     Postcode.create(data, (err, results) => {
//         if (err) res.status(500).send(err);
//         res.json({ id: results.insertId });
//     });
// };

// exports.updatePostcode = (req, res) => {
//     const data = req.body;
//     Postcode.update(req.params.id, data, (err) => {
//         if (err) res.status(500).send(err);
//         res.send('Postcode updated successfully');
//     });
// };

// exports.deletePostcode = (req, res) => {
//     Postcode.delete(req.params.id, (err) => {
//         if (err) res.status(500).send(err);
//         res.send('Postcode deleted successfully');
//     });
// };


const Postcode = require('../models/Postcode');

exports.getAllPostcodes = (req, res) => {
    Postcode.getAll((err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

exports.getPostcodeById = (req, res) => {
    Postcode.getById(req.params.id, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results[0]);
    });
};

exports.createPostcode = (req, res) => {
    const data = req.body;
    Postcode.create(data, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ id: results.insertId });
    });
};

exports.updatePostcode = (req, res) => {
    const data = req.body;
    Postcode.update(req.params.id, data, (err) => {
        if (err) return res.status(500).send(err);
        res.send('Postcode updated successfully');
    });
};

exports.deletePostcode = (req, res) => {
    Postcode.delete(req.params.id, (err) => {
        if (err) return res.status(500).send(err);
        res.send('Postcode deleted successfully');
    });
};
