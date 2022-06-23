
const ordersModel = require('../models/orders.model');
const { v4: uuid } = require('uuid');

const ordersCtrl = {
    postCreateOrder: (req, res) => {
        // const orderId = new Date().toISOString().slice(0, 10);
        const orderId = uuid();
        const modelData = {
            orderId: orderId,
            userId: req.body.userId,
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            subtotal: req.body.subtotal,
            shippingFees: req.body.shippingFees,
            tax: req.body.tax,
            total: req.body.total,
        };
        ordersModel.create(modelData, (err, data) => {
            if (!err) {
                res.status(201).send({ message: `Order ID: ${orderId} is created`});
            } else {
                res.status(500).send({ message: err.message });
            }
        });
    },

    getOrder: async(req, res) => {
        const order = await ordersModel.findOne({ orderId: req.params.id });
        if (order) {
            // console.log(req.params);
            // console.log(req.params.id);
            // console.log(order);
            res.status(200).send(order);
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    },

    getAllOrders: async (req, res) => {
        const orderHistory = await ordersModel.find({ userId: req.query.userid });
        if (orderHistory) {
            res.status(200).send(orderHistory);
        } else {
            res.status(404).send({ message: 'User Not Found' });
        }
    }
}

module.exports = ordersCtrl;