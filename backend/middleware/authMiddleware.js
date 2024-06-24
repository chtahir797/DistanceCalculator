// backend/middleware/authMiddleware.js

// module.exports = (req, res, next) => {
//     // Your authentication logic here
//     const token = req.headers.authorization;

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized: Missing token' });
//     }

//     // Verify token logic, example using JWT
//     try {
//         const decoded = jwt.verify(token.split(' ')[1], 'secret_key');
//         req.user = decoded;
//         next();
//     } catch (err) {
//         return res.status(403).json({ message: 'Unauthorized: Invalid token' });
//     }
// };

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], 'secret_key');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Unauthorized: Invalid token' });
    }
};

