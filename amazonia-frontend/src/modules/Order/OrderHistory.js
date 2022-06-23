import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import './OrderHistory.css';

/* Component Imports */
import LoadingPage from 'components/Loading Page/LoadingPage';

/* Utility Imports */
import Axios from 'utils/Axios';

/* Data Store Importws */
import { DataStore } from 'data/DataStore';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, orderHistory: action.payload }
        case 'FECTH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

const initialState = { loading: true, error: '', orderHistory: [] }

function OrderHistory() {

    /* useReducer */
    const [{ loading, error, orderHistory }, dispatch] = useReducer(reducer, initialState);

    /* Data Store */
    const { state } = useContext(DataStore);
    const { userInfo } = state;

    /* useNavigate */
    const navigate = useNavigate();

    /* useEffect */
    useEffect(() => {
        if (!userInfo) {
            navigate('/signin?redirect=/orders');
        }
    });

    useEffect(() => {
        dispatch({ type: 'FETCH_REQUEST' });
        Axios
            .get(`/orders?userid=${userInfo.userid}`, {
                headers: { authorization: `Bearer ${userInfo.jwt}` }
            })
            .then((res) => {
                dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
            })
            .catch((err) => {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
        })
    }, []);

    /* Functions */
    const toOrder = (id) => {
        navigate(`/orders/${id}`);
    }

    return (
        <div>
            <Helmet>
                <title>Order History</title>
            </Helmet>
            <div className="orderHistory__container">
                <div className="orderHistory__header">
                    <h5>Order History</h5>
                </div>
                {
                    loading
                        ? (<LoadingPage loading={loading} />)
                        : error
                            ? (<div>{error.message}</div>)
                            : (
                                <div className="orderHistory__body">
                                    <div className='orderHistory__body__scroll'>
                                        <div className="orderHistory__body__header">
                                            <div className='field' >ORDER ID</div>
                                            <div className='field' >DATE</div>
                                            <div className='field' >TOTAL</div>
                                            <div className='field' >PAID</div>
                                            <div className='field' >DELIVERED</div>
                                            <div className='field' >ORDER DETAILS</div>
                                        </div>
                                        <div className="orderHistory__body__rows">
                                            {
                                                orderHistory.map((order) => (
                                                    <div className='row' key={order.orderId}>
                                                        <div className='field' >{order.orderId}</div>
                                                        <div className='field' >{order.createdAt}</div>
                                                        <div className='field' >{`$${order.total}`}</div>
                                                        <div className='field' >{order.isPaid ? 'Yes' : 'No'}</div>
                                                        <div className='field' >{order.isDelivered ? 'Yes' : 'No'}</div>
                                                        <div className='field' >
                                                            <button onClick={() => toOrder(order.orderId)}>Details</button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                }
            </div>
        </div>
  );
}

export default OrderHistory;