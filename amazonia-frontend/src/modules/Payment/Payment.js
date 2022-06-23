import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import './Payment.css';

/* Component Imports */
import StepBar from 'components/Step Bar/StepBar';

/* MUI Imports */
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

/* Image Imports */
import PayPal from 'images/paypal.png';
import Stripe from 'images/stripe.png';
import Visa from 'images/visa.png';
import Master from 'images/master.png';

/* Miscellaneous Imports */
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* Data Store Import */
import { DataStore } from 'data/DataStore';

function Payment() {

    /* useState */
    const [active, setActive] = useState(0);

    /* useNavigate */
    const navigate = useNavigate();

    /* Data Store */
    const { state, dispatch: ctxDispatch } = useContext(DataStore);
    const { userInfo } = state;

    /* useEffect */
    useEffect(() => {
        if (!userInfo) {
            navigate('/signin');
        }
    }, [userInfo, navigate]);

    /* Functions */
    const back = () => {
        navigate('/shipping');
    };

    const savePayment = () => {
        let method = '';
        if (active === 0) {
            toast.error(
                'Please select Payment Method',
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                }
            );
        } else {
            if (active === 1) {
                method = 'paypal';
            } else if (active === 2) {
                method = 'stripe';
            } else if (active === 3) {
                method = 'visa';
            } else if (active === 4) {
                method = 'master';
            } else if (active === 5) {
                method = 'banking';
            } else if (active === 6) {
                method = 'cod';
            }

            ctxDispatch({
                type: 'SAVE_PAYMENT_METHOD',
                payload: method
            });
            navigate('/checkout');
        }
    };

    return (
        <div className='payment'>
            <Helmet>
                <title>Payment Methods</title>
            </Helmet>
            <StepBar step1 step2 step3/>
            <div className="payment__form">
                <div className="payment__header">
                    <h5>Payment Methods</h5>
                </div>
                <div className="payment__infoBox">
                    <div
                        className={`payment__option paypal ${active === 1 ? 'selected' : ''}`}
                        onClick={() => setActive(1)}>
                        <img src={PayPal} />
                    </div>
                    <div
                        className={`payment__option stripe ${active === 2 ? 'selected' : ''}`}
                        onClick={() => setActive(2)}>
                        <img src={Stripe} alt='' />
                    </div>
                    <div
                        className={`payment__option visa ${active === 3 ? 'selected' : ''}`}
                        onClick={() => setActive(3)}>
                        <img src={Visa} alt=''/>
                    </div>
                    <div
                        className={`payment__option master ${active === 4 ? 'selected' : ''}`}
                        onClick={() => setActive(4)}>
                        <img src={Master} akt='' />
                    </div>
                    <div
                        className={`payment__option banking ${active === 5 ? 'selected' : ''}`}
                        onClick={() => setActive(5)}>
                        <AccountBalanceIcon />
                        <span>Banking</span>
                    </div>
                    <div
                        className={`payment__option cod ${active === 6 ? 'selected' : ''}`}
                        onClick={() => setActive(6)}>
                        <AttachMoneyIcon />
                        <span>Cash on Delivery (COD)</span>
                    </div>
                </div>
                <div className='payment__button'>
                    <button id='back' onClick={() => back()}>Back</button>
                    <button onClick={() => savePayment()}>Continue</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Payment;