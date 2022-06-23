import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import './OrderTotal.css';

/* Data Store Imports */
import { DataStore } from 'data/DataStore';

function OrderTotal({ order }) {

    const { subtotal, shippingFees, tax, total } = order;

    /* useNavigate */
    const navigate = useNavigate();

    /* Data Store */
    const { state, dispatch: ctxDispatch } = useContext(DataStore);
    const { cart } = state;

    /* Functions */
    const orderHistory = () => {
        navigate('/orders');
    }

    return (
        <div className="order__total">
            <div className="order__total__header">
                <h5>Order Summary</h5>
            </div>
            <div className="order__total__info">
                <div className="labels">
                    <p>Subtotal: </p>
                    <p>Shipping Fees: </p>
                    <p>Tax: </p>
                    <p id='total'>Total: </p>
                </div>
                <div className="values">
                    <p><small>$</small>{subtotal}</p>
                    <p><small>$</small>{shippingFees}</p>
                    <p><small>$</small>{tax}</p>
                    <p id='total'><small>$</small>{total}</p>
                </div>
            </div>
            <div className="order__back__button">
                <button onClick={() => orderHistory()} >
                    View All Orders
                </button>
            </div>
        </div>
    );
}

export default OrderTotal;