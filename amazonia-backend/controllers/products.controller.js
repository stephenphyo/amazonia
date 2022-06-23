
const productsModel = require('../models/products.model');

const productsCtrl = {
    getProducts: (req, res) => {
        productsModel.find((err, data) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.status(200).send(data);
            }
        })
    },

    getEachProductById: (req, res) => {
        productsModel.findOne({id: req.params.id}, (err, data) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.status(200).send(data);
            }
        })
    },

    createProduct: async (req, res) => {
        productsModel.create(req.body, (err, data) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.status(201).send(data);
            }
        })
    }
}

module.exports = productsCtrl;