const router = require('express').Router();
const BukuController = require('../controllers/bukuController');
const UserController = require('../controllers/userController');
const authentication = require('../middlewares/authentication');

router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);
router.get('/buku', BukuController.GetAllBooks);
router.use(authentication);
router.get('/buku/:id', BukuController.GetOneBookById);
router.put('/buku/:id', BukuController.updadateBook);
router.post('/buku', BukuController.createBook);
router.delete('/buku/:id', BukuController.deleteBook);

module.exports = router;

