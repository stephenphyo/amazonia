import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CheckoutInfo.css';

/* MUI Imports */
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';

/* Data Store Import */
import { DataStore } from 'data/DataStore';

function CheckoutInfo() {

    /* Data Store */
    const { state } = useContext(DataStore);
    const { cart, cart: { cartItems: items }, shippingAddresses, paymentMethod } = state;
    const { fullName, address1, address2, postal, city, country, mobile } = shippingAddresses;

    /* useState */
    const [payment, setPayment] = useState('');

    /* useEffect */
    useEffect(() => {
        if (paymentMethod === 'paypal') {
            setPayment('PayPal');
        }
        if (paymentMethod === 'stripe') {
            setPayment('Stripe');
        }
        if (paymentMethod === 'visa') {
            setPayment('VISA Card');
        }
        if (paymentMethod === 'master') {
            setPayment('MasterCard');
        }
        if (paymentMethod === 'banking') {
            setPayment('Banking');
        }
        if (paymentMethod === 'cod') {
            setPayment('Cash on Delivery (COD)');
        }
    });

    return (
        <div className='checkout__infoContainer'>
            <div className="checkout__info checkout__shipping">
            <div className="checkout__shipping__header">
                    <h5>
                        <LocalShippingOutlinedIcon />
                        Shipping Address
                    </h5>
                    <Link to='/shipping'>Edit</Link>
                </div>
                <div className="checkout__shipping__info">
                    <div className='info__row'>
                        <p id='left'>Name: </p>
                        <p id='right'>{fullName}</p>
                    </div>
                    <div className='info__row'>
                        <p id='left'>Shipping Address: </p>
                        <p id='right'>
                            {`${address1},
                            ${address2 === '' ? '' : `${address2},`}
                            ${city}, ${country} (${postal})`}
                        </p>
                    </div>
                    <div className='info__row'>
                        <p id='left'>Mobile Number: </p>
                        <p id='right'>{mobile}</p>
                    </div>
                </div>
            </div>
            <div className="checkout__info checkout__payment">
                <div className="checkout__payment__header">
                    <h5>
                        <CreditCardOutlinedIcon />
                        Payment Method
                    </h5>
                    <Link to='/payment'>Edit</Link>
                </div>
                <div className="checkout__payment__info">
                    <p>Method: <strong>{payment}</strong></p>
                </div>
            </div>
            <div className="checkout__info checkout__cart">
                <div className="checkout__cart__header">
                    <h5>
                        <ShoppingCartOutlinedIcon />
                        Shopping Cart Items
                    </h5>
                    <Link to='/cart'>Edit</Link>
                </div>
                <div className="checkout__cart__cartItems">
                    {items.map((item) => (
                        <div className='checkout__cart__item__row' key={item.id}>
                            <div className='checkout__cart__item__image'>
                                <img
                                    src={item.coverImage}
                                    alt={item.id}
                                />
                            </div>
                            <div className="checkout__cart__item__description">
                                {item.name}
                            </div>
                            <div className="checkout__cart__item__price">
                                <div className="checkout__cart__item__priceContainer">
                                    <p className='new'>{`$ ${item.price}`}</p>
                                    <p className='original'>{`$ ${item.orgPrice}`}</p>
                                </div>
                            </div>
                            <div className="checkout__cart__item__count">
                                <label>{item.itemQty}</label>
                            </div>
                            <div className="checkout__cart__item__price">
                                <div className="checkout__cart__item__priceContainer">
                                    <p className='new'>{`$ ${(item.price*item.itemQty).toFixed(2)}`}</p>
                                    <p className='original'>{`$ ${(item.orgPrice*item.itemQty).toFixed(2)}`}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CheckoutInfo;