import React, { useContext, useEffect, useState } from 'react';
import './OrderInfo.css';

/* MUI Imports */
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

/* Data Store Import */
import { DataStore } from 'data/DataStore';

function OrderInfo({ order }) {

    const { orderId, shippingAddress, paymentMethod } = order;
    const { orderItems: items } = order;
    const { fullName, address1, address2, city,
        country, postal, mobile } = shippingAddress;

    /* useState */
    const [payment, setPayment] = useState('');
    const [dropdown, setDropdown] = useState(false);

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
        <div className='order__infoContainer'>
            <div className="order__info checkout__shipping">
            <div className="order__shipping__header">
                    <h5>
                        <LocalShippingOutlinedIcon />
                        <p>Shipping Status</p>
                    </h5>
                </div>
                <div className="order__shipping__info">
                    <div
                        className="info__dropdown"
                        onClick={() => setDropdown(!dropdown)}
                    >
                        <p>Shipping Address</p>
                        <ArrowDropDownIcon className={`arrow ${dropdown && 'selected'}`}/>
                    </div>
                    {/* {
                        dropdown &&
                        <div className='info__rowContainer'>
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
                    } */}
                    <div className={`info__rowContainer ${dropdown && 'selected'}`}>
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
                    <div className='shipping_status'>
                        <p>Status</p>
                    </div>
                </div>
            </div>
            <div className="order__info checkout__payment">
                <div className="order__payment__header">
                    <h5>
                        <CreditCardOutlinedIcon />
                        Payment Method
                    </h5>
                </div>
                <div className="order__payment__info">
                    <p>Method: <strong>{payment}</strong></p>
                    <div className='payment_status'>
                        <p>Status</p>
                    </div>
                </div>
            </div>
            <div className="order__info checkout__cart">
                <div className="order__cart__header">
                    <h5>
                        <ShoppingCartOutlinedIcon />
                        Shopping Cart Items
                    </h5>
                </div>
                <div className="order__cart__cartItems">
                    {items.map((item) => (
                        <div className='order__cart__item__row' key={item.id}>
                            <div className='order__cart__item__image'>
                                <img
                                    src={item.coverImage}
                                    alt={item.id}
                                />
                            </div>
                            <div className="order__cart__item__description">
                                {item.name}
                            </div>
                            <div className="order__cart__item__price">
                                <div className="order__cart__item__priceContainer">
                                    <p className='new'>{`$ ${item.price}`}</p>
                                    <p className='original'>{`$ ${item.orgPrice}`}</p>
                                </div>
                            </div>
                            <div className="order__cart__item__count">
                                <label>{item.itemQty}</label>
                            </div>
                            <div className="order__cart__item__price">
                                <div className="order__cart__item__priceContainer">
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

export default OrderInfo;