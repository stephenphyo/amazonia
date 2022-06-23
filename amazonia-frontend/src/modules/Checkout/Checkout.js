import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import './Checkout.css';

/* Module Imports */
import CheckoutInfo from 'modules/Checkout/CheckoutInfo';
import CheckoutTotal from 'modules/Checkout/CheckoutTotal';

/* Component Imports */
import StepBar from 'components/Step Bar/StepBar';
import LoadingPage from 'components/Loading Page/LoadingPage';

/* Utility Imports */
import Axios from 'utils/Axios';

/* Data Store Import */
import { DataStore } from 'data/DataStore';

const reducer = (state, action) => {
    switch (action.type) {
        case 'ORDER_REQUEST':
            return { ...state, loading: true };
        case 'ORDER_SUCCESS':
            return { ...state, loading: false };
        case 'ORDER_FAIL':
            return { ...state, loading: false };
        default:
            return state;
    }
}

function Checkout() {

    /* useNavigate */
    const navigate = useNavigate();

    /* useReducer */
    const [{ loading }, dispatch] = useReducer(reducer, {
        loading: false
    });

    /* Data Store */
    const { state, dispatch: ctxDispatch } = useContext(DataStore);
    const { userInfo, cart } = state;
    const { shippingAddresses, paymentMethod } = state;

    /* useEffect */
    useEffect(() => {
        if (!userInfo) {
            navigate('/signin?redirect=/shipping');
        }
    }, [userInfo]);

    /* Functions */
    const round2 = (num) =>
        Math.round(num * 100 + Number.EPSILON) / 100;

    const placeOrder = async() => {
        try {
            dispatch({ type: 'ORDER_REQUEST' });
            const res = await Axios.post('/orders', {
                userId: userInfo.userid,
                orderItems: cart.cartItems,
                shippingAddress: shippingAddresses,
                paymentMethod: paymentMethod,
                subtotal: cart.subtotal,
                shippingFees: cart.shippingFees,
                tax: cart.tax,
                total: cart.total,
            },
            {
                headers: {
                    authorization: `Bearer ${userInfo.jwt}`
                }
            });
            dispatch({ type: 'ORDER_SUCCESS' });
            ctxDispatch({ type: 'CART_CLEAR' });
            console.log(cart)
            navigate(`/orders/${res.data.orderId}`)
        } catch (err) {
            dispatch({ type: 'ORDER_FAIL' });
            console.log(err);
        }
    }

    /* Calculations */
    cart.subtotal = round2(
        cart.cartItems.reduce((prev, cur) => prev + cur.itemQty * cur.price, 0)
    );
    cart.shippingFees = round2(10);
    cart.tax = round2(0.05 * cart.subtotal);
    cart.total = round2(cart.subtotal + cart.shippingFees + cart.tax);

    return (
        <div className='review'>
            <Helmet>
                <title>Preview Order</title>
            </Helmet>
            <StepBar step1 step2 step3 step4/>
            <div className="checkout__container">
                <h2>Preview Order</h2>
                <div className="checkout__body">
                    <CheckoutInfo />
                    <CheckoutTotal
                        cart={cart}
                        placeOrder={placeOrder}
                    />
                </div>
            </div>
            {loading && <LoadingPage />}
        </div>
    );
}

export default Checkout;