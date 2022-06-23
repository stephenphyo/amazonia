import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import './Order.css';

/* Module Imports */
import OrderInfo from 'modules/Order/OrderInfo';
import OrderTotal from 'modules/Order/OrderTotal';

/* Component Imports */
import LoadingPage from 'components/Loading Page/LoadingPage';

/* Utility Imports */
import Axios from 'utils/Axios';

/* Data Store Import */
import { DataStore } from 'data/DataStore';

/* Miscellaneous Imports */
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, error: '', order: action.payload }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
    }
}

function Order() {

    /* useReducer */
    const [{ loading, error, order }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
        order: {}
    });

    /* Data Store */
    const { state } = useContext(DataStore);
    const { userInfo } = state;

    /* useNavigate */
    const navigate = useNavigate();

    /* useParams */
    const params = useParams();
    const { id: orderId } = params;

    /* useEffect */
    useEffect(() => {
        if (!userInfo) {
            navigate('/signin');
        }
    }, [userInfo]);

    useEffect(() => {
        const fetchOrder = async() => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await Axios.get(`/orders/${orderId}`, {
                    headers: { authorization: `Bearer ${userInfo.jwt}` }
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        }

        if (!order.orderId || (order.orderId && order.orderId !== orderId)) {
            fetchOrder();
        }
    }, [order, orderId]);

    return (
        <div className='review'>
            <Helmet>
                <title>Order</title>
            </Helmet>
            {
                loading
                    ? (<LoadingPage loading={loading} />)
                    : error
                        ? (<div>{error} </div>)
                        : (
                            <div className="order__container">
                                <h2>Order</h2>
                                {/* <p>{order.orderId}</p>
                                <p>{order.userId}</p> */}
                                <div className="order__body">
                                    <OrderInfo order={order} />
                                    <OrderTotal order={order} />
                                </div>
                            </div>
                        )
            }
        </div>
    );
}

export default Order;