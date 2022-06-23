import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartSubtotal.css';

/* Data Store Imports */
import { DataStore } from 'data/DataStore';

function CartSubtotal() {

    const navigate = useNavigate();

    /* Data Store */
    const { state } = useContext(DataStore);
    const { cart: { cartItems: items } } = state;

    /* Functions */
    const checkout = () => {
        navigate(`/signin?redirect=${
            localStorage.getItem('shippingAddresses') ? '/payment' : '/shipping'
        }`);
    };

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

    return (
        <div className="cart__subtotal">
            <div className="subtotal">
                <div className="subtotal__left">
                    <p id="subtotal">Subtotal <span id="item">{`(${items.reduce((prev, cur) => prev + cur.itemQty, 0)} items)`}</span>:</p>
                    <p>Discount:</p>
                    <p>Original Price:</p>
                </div>
                <div className="subtotal__right">
                    <p id="subtotal">
                        {`$ ${items.reduce((prev, cur) => round2(prev + cur.itemQty * cur.price), 0)}`}
                    </p>
                    <p id="discount">
                        {`$ ${items.reduce((prev, cur) => round2((prev + (cur.orgPrice - cur.price) * cur.itemQty)), 0)}`}
                    </p>
                    <p id="original">
                        {`$ ${items.reduce((prev, cur) => round2((prev + cur.orgPrice * cur.itemQty)), 0)}`}
                    </p>
                </div>
                {/* <span>{`Subtotal (${items.reduce((prev, cur) => prev + cur.itemQty, 0)} items)`}
                    <span id='currency'> $</span>
                    <span id='value'>{items.reduce((prev, cur) => round2(prev + cur.itemQty * cur.price), 0)}</span>
                    <p>
                        <span id='discount'>{`$ ${items.reduce((prev, cur) => round2((prev + (cur.orgPrice - cur.price) * cur.itemQty)), 0)}`}</span>
                    </p>
                    <p>
                        <span id='original'>{`$ ${items.reduce((prev, cur) => round2((prev + cur.orgPrice * cur.itemQty)), 0)}`}</span>
                    </p>
                </span> */}
            </div>
            <div className="subtotal__button">
                <button
                    disabled={items.length === 0}
                    onClick={() => checkout()}
                >
                    Check Out
                </button>
            </div>
        </div>
    );
}

export default CartSubtotal;