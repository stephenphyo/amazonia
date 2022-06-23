const cartsModel = require('../models/carts.model');

const cartsCtrl = {
    getAll: (req, res) => {
        cartsModel.find((err, data) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.status(200).send(data);
            }
        })
    },

    getCartItems: (req, res) => {
        cartsModel.findOne({ userid: req.query.userid }, (err, data) => {
            if (!err) {
                res.status(200).send(data);
            } else {
                res.status(500).send(err.message);
            }
        })
    },

    updateCartItems: (req, res) => {
        /* If the query filter passed to these methods does not find any matches
        and the upsert option is set to 'true', MongoDB inserts the update document. */
        cartsModel.updateOne(
            { userid: req.body.userid },    // Query
            req.body,   // Data
            { upsert: true },   // Options
            (err, data) => {
                if (!err) {
                    res.status(201).send(data);
                } else {
                    res.status(500).send(err.message);
                }
            })
    }
}

module.exports = cartsCtrl;