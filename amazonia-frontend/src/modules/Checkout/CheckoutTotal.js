import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import './CheckoutTotal.css';

/* Data Store Import */
import { DataStore } from 'data/DataStore';

function CheckoutTotal({ cart, placeOrder }) {
    return (
        <div className="checkout__total">
            <div className="checkout__total__header">
                <h5>Order Summary</h5>
            </div>
            <div className="checkout__total__info">
                <div className="labels">
                    <p>Subtotal: </p>
                    <p>Shipping Fees: </p>
                    <p>Tax: </p>
                    <p id='total'>Total: </p>
                </div>
                <div className="values">
                    <p><small>$</small>{cart.subtotal}</p>
                    <p><small>$</small>{cart.shippingFees}</p>
                    <p><small>$</small>{cart.tax}</p>
                    <p id='total'><small>$</small>{cart.total}</p>
                </div>
            </div>
            <div className="checkout__total__button">
                <button onClick={() => placeOrder()} >
                    Place Order
                </button>
            </div>
        </div>
    );
}

export default CheckoutTotal;