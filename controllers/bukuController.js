const { Buku, User } = require('../models');
class BukuController {
    static GetAllBooks(req, res) {
        Buku.findAll()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static GetOneBookById(req, res) {
        let id = +req.params.id;
        Buku.findByPk(id)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static createBook(req, res) {
        const { judul, kategori, ringkasan, penulis, tanggal_upload, image_url, read_url } = req.body;

        let data = {
            judul,
            kategori,
            ringkasan,
            penulis,
            tanggal_upload,
            image_url,
            read_url
        }
        Buku.create(data)
            .then(result => {
                res.status(201).json(result);
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static updadateBook(req, res) {
        let id = +req.params.id;
        const { judul, kategori, ringkasan, penulis, tanggal_upload, image_url, read_url } = req.body;
        let data = {
            judul,
            kategori,
            ringkasan,
            penulis,
            tanggal_upload,
            image_url,
            read_url
        }
        Buku.update(data, { where: { id }, returning: true })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static deleteBook(req, res) {
        let id = +req.params.id;
        Buku.destroy({ where: { id } })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}
module.exports = BukuController;