import React, { useContext, useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Axios from './Axios.js';
import { DataStore } from './DataStore.js';
import { Helmet } from 'react-helmet-async';
import './SignIn.css';

function SignIn() {

    /* Testing */
    const [isRise, setRise] = useState(false);

    /* Search for Navigation */
    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : '/';

    /* useNavigate */
    const navigate = useNavigate();

    /* useState */
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    /* useContext */
    const { state, dispatch: ctxDispatch } = useContext(DataStore);
    const { userInfo } = state;

     /* useEffect */
    // Restricting to call '/signin' page when user is already signed in
    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    })

    /* Functions */
    const signin = async () => {
        await Axios.post('/users/signin', {
            email: email,
            password: password
        }).then((res) => {
            ctxDispatch({ type: 'USER_SIGNIN', payload: res.data });
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            navigate(redirect);
        }).catch ((err) => {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
            }
        });

        Axios
            .get(
                `/carts?userid=${localStorage.getItem('userInfo') &&
                JSON.parse(localStorage.getItem('userInfo')).userid}`
            )
            .then((res) => {
                /* For new users, there is no information about 'cartItems' in the database.
                Thus, it needs to check whether the database has 'cartItems' information */
                const initCartItems = res.data.cartItems ? res.data.cartItems : [];
                ctxDispatch({ type: 'INITIAL_CART_ITEMS', payload: initCartItems });
                localStorage.setItem('cartItems', JSON.stringify(initCartItems));
                // console.log(res);
                // console.log(localStorage.getItem('cartItems'));
                // console.log(res.data.cartItems);
                // console.log(state.cart.cartItems);
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    return (
        <div className='signin__container'>
            <Helmet>
                <title>Sign in to your account</title>
            </Helmet>
            <div className="signin__form">
                <div className="signin__header">
                    <h3>SIGN IN TO YOUR ACCOUNT</h3>
                </div>
                <div className="signin__infobox">
                    <div className="signin__info">
                        <label>Email</label>
                        <Tooltip
                            title={<>Please fill out this form</>}
                            placement='bottom'
                            arrow
                        >
                            <input
                                className='input-email'
                                type='text'
                                placeholder='Enter Email Address'
                                //value={localStorage.getItem('userInfo') ? localStorage.getItem('userInfo').username : ''}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Tooltip>
                    </div>
                    <div className="signin__info">
                        <label>Password</label>
                        <input
                            className='input-password'
                            type='password'
                            placeholder='Enter password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className='signin__button'>
                    <button onClick={() => signin()}>SIGN IN</button>
                </div>
                <div className="signin__footer">
                    <span id='label'>New customer?</span>
                    <a href={`/signup?redirect=${redirect}`}>Create New Account</a>
                </div>
            </div>
            <div className={`underground ${isRise && 'rise'}`} onClick={() => isRise ? setRise(false) : setRise(true)}>
                Underground
            </div>
        </div>
    );
}

export default SignIn;