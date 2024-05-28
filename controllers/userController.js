const { comparePassword, hashPassword } = require('../helpers/bcrypt');
const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');
const { Op } = require('sequelize');

class UserController {
    static async register(req, res) {
        const { nama, email, password, username, role } = req.body;
        try {
            // Validasi input
            if (!nama || !email || !password || !username || !role) {
                return res.status(400).json({ message: 'Data harus diisi' });
            }
            // Cek apakah email atau username sudah ada
            const existingUser = await User.findOne({
                where: {
                    [Op.or]: [{ email }, { username }]
                }
            });

            if (existingUser) {
                return res.status(409).json({ message: 'Email atau username sudah digunakan' });
            }
            const hashedPassword = await hashPassword(password);
            const user = await User.create({
                nama,
                email,
                username,
                role,
                password: hashedPassword
            });
            const response = {
                id: user.id,
                nama: user.nama,
                email: user.email,
                username: user.username,
                role: user.role
            };
            res.status(201).json(response);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
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
            const token = generateToken(response)
            res.status(200).json({ token });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    static GetAllUsers(req, res) {
        User.findAll()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static GetOneUserById(req, res) {
        let id = +req.params.id;
        User.findByPk(id)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static async updateUser(req, res) {
        let id = +req.params.id;
        const { nama, email, password, username, role } = req.body;
        try {
            // Validasi input
            if (!nama || !email || !password || !username || !role) {
                return res.status(400).json({ message: 'Data harus diisi' });
            }

            // Periksa jika username atau email sudah digunakan oleh pengguna lain
            const existingUser = await User.findOne({
                where: {
                    [Op.and]: [
                        { [Op.or]: [{ email }, { username }] },
                        { id: { [Op.not]: id } } // Exclude the current user from the query
                    ]
                }
            });

            if (existingUser) {
                return res.status(409).json({ message: 'Email atau username sudah digunakan oleh pengguna lain' });
            }

            // Perbarui pengguna
            const hashedPassword = await hashPassword(password);
            let data = {
                nama,
                username,
                role,
                email,
                password: hashedPassword
            }
            const result = await User.update(data, { where: { id }, returning: true });
            res.status(200).json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }


    static deleteUser(req, res) {
        let id = +req.params.id;
        User.destroy({ where: { id } })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = UserController;
