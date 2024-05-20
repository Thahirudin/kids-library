const { comparePassword, hashPassword } = require('../helpers/bcrypt');
const { User } = require('../models');
const {generateToken} = require('../helpers/jwt');
class UserController {
    static async register(req, res) {
        const { nama, email, password } = req.body;
        try {
            const hashedPassword = await hashPassword(password);
            const user = await User.create({
                nama,
                email,
                password: hashedPassword
            });
            const response = {
                id: user.id,
                nama: user.nama,
                email: user.email
            };
            res.status(201).json(response);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({
                where: { email }
            });
            if (!user) {
                return res.status(404).json({ error: `User with email "${email}" not found` });
            }
            const isCorrect = await comparePassword(password, user.password);
            if (!isCorrect) {
                return res.status(401).json({ error: 'Incorrect password' });
            }
            const response = {
                id: user.id,
                nama: user.nama,
                email: user.email
            };
            const token =  generateToken(response)
            res.status(200).json({token});
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = UserController;
