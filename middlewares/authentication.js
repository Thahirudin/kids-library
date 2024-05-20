const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt');

async function authentication(req, res, next) {
    try {
        const token = req.get('token');
        const userDecoded = verifyToken(token);
        const user = await User.findOne({
            where: { id: userDecoded.id, email: userDecoded.email, nama: userDecoded.nama }
        });
        if (!user) {
            return res.status(401).json({
                name: 'Authentication Error',
                devMessage: `User with id "${userDecoded.id}" not found`
            });
        }
        res.locals.user = user;
        return next(); // Panggil next setelah menetapkan user di locals
    } catch (err) {
        console.error(err);
        return res.status(401).json({
            name: 'Authentication Error',
            devMessage: 'Failed to authenticate user'
        });
    }
}

module.exports = authentication;
