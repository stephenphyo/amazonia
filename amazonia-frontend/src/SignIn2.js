import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './SignIn2.css';

/* Utility Import */
import Axios from 'utils/Axios.js';
import SignInMsalButton from 'auth/MICROSOFT MSAL/SignInMSALButton';

/* MUI Imports */
import ErrorIcon from '@mui/icons-material/Error';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

/* Data Store Imports */
import { DataStore } from 'data/DataStore';

/* Microsoft MSAL Imports */
import { useMsal } from "@azure/msal-react";
import { useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "auth/MICROSOFT MSAL/configMSAL";
import { callMsGraph } from "auth/MICROSOFT MSAL/MSGraph";

/* Image Imports */
import onlineshop from 'images/onlineshop01.png';
import Google from 'images/google.png';
import Microsoft from 'images/microsoft.png';

/* Component Imports */
import LoadingPage from 'components/Loading Page/LoadingPage';

const reducer = (state, action) => {
    switch (action.type) {
        case 'SIGNIN_REQUEST':
            return { ...state, loading: true };
        case 'SIGNIN_SUCCESS':
            return { ...state, loading: false };
        case 'SIGNIN_FAIL':
            return { ...state, loading: false, err: action.payload };
        case 'CLEAR_ERROR':
            return { ...state, err: {} };
        default:
            return state;
    }
};

const initialState = { loading: false, err: {} }

function SignIn2() {

    /* Initialization */
    let errObj = {};

    /* useReducer */
    const [state, dispatch] = useReducer(reducer, initialState);

    /* Search for Navigation */
    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : '/';

    /* useNavigate */
    const navigate = useNavigate();

    /* useState */
    const [ email, setEmail ] = useState('');
    const [password, setPassword] = useState('');
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [remember, setRemember] = useState(false);

    /* useContext */
    const { state: ctxState, dispatch: ctxDispatch } = useContext(DataStore);
    const { userInfo } = ctxState;

    /* Microsoft MSAL */
    const { instance, accounts, inProgress } = useMsal();
    const [graphData, setGraphData] = useState();
    const isAuthenticated = useIsAuthenticated();

    const handleMsalLogin = (instance) => {
        instance.loginPopup(loginRequest).catch(e => {
            console.error(e);
        });
    }

    const RequestMSALProfileData = () => {
        const req = {...loginRequest, account: accounts[0]};

        /* Silently acquires an access token which is then attached to
            a request for Microsoft Graph data */
        instance.acquireTokenSilent(req).then((res) => {
            callMsGraph(res.accessToken)
                .then(res => setGraphData(res));
        }).catch((e) => {
            instance.acquireTokenPopup(req).then((res) => {
                callMsGraph(res.accessToken)
                    .then(res => setGraphData(res));
            });
        });
    }

    /* Functions */
    const checkEmail = () => {
        var regex = /\S+@\S+.[a-z]{2,}$/;
        if (email === '') {
            errObj['email'] = "Please enter email address"
        }
        else if (!regex.test(email)) {
            errObj['email'] = "Please enter valid email address";
        };
    }

    const checkPassword = () => {
        if (password === '') {
            errObj['password'] = "Please enter password"
        }
        else if (password.length < 8) {
            errObj['password'] = "Password length is 8 or above";
        }
    }

    const signin = async () => {
        // Error Checking
        checkEmail();
        checkPassword();

        if (Object.keys(errObj).length === 0) {
            dispatch({ type: 'SIGNIN_REQUEST' });
            await Axios.post('/users/signin', {
                email: email,
                password: password
            }).then((res) => {
                dispatch({ type: 'SIGNIN_SUCCESS' });
                ctxDispatch({ type: 'USER_SIGNIN', payload: res.data });
                localStorage.setItem('userInfo', JSON.stringify(res.data));
                if (remember) {
                    localStorage.setItem('email', email);
                }
                navigate(redirect);
            }).catch ((err) => {
                let errCode = err.response.status;
                if (errCode === 404 || errCode === 401) {
                    dispatch({
                        type: 'SIGNIN_FAIL',
                        payload: { email: 'Invalid email or password' }
                    });
                }
            });

            Axios.get(
                    `/carts?userid=${localStorage.getItem('userInfo') &&
                    JSON.parse(localStorage.getItem('userInfo')).userid}`
                )
                .then((res) => {
                    /* For new users, there is no information about 'cartItems' in the database.
                    Thus, it needs to check whether the database has 'cartItems' information */
                    const initCartItems = res.data.cartItems ? res.data.cartItems : [];
                    ctxDispatch({ type: 'INITIAL_CART_ITEMS', payload: initCartItems });
                    localStorage.setItem('cartItems', JSON.stringify(initCartItems));
                })
                .catch(err => {
                    console.log(err.message);
                });
        } else {
            dispatch({ type: 'SIGNIN_FAIL', payload: errObj });
        }
    }

    const signin_msal = async(data) => {
        await Axios.post('/users/signinMsal', data)
    }

    /* useEffect */
    // Restricting to call '/signin' page when user is already signed in
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    });

    useEffect(() => {
        dispatch({ type: 'CLEAR_ERROR' });
    }, [email, password]);

    useEffect(() => {
        if (localStorage.getItem('email')) {
            setEmail(localStorage.getItem('email'))
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            RequestMSALProfileData();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (graphData) {
            let msalData = {
                userId: graphData.id,
                firstName: graphData.givenName,
                lastName: graphData.surname,
                email: graphData.userPrincipalName,
            };
            ctxDispatch({ type: 'USER_SIGNIN', payload: { ...msalData, signinMethod: 'M' } });
            localStorage.setItem('userInfo', JSON.stringify({ ...msalData, signinMethod: 'M' }));
            console.log(graphData);
            signin_msal(msalData);
        }
    }, [graphData]);

    return (
        <div className='signin__container'>
            <Helmet>
                <title>Sign In to Account</title>
            </Helmet>
            {state.loading && <LoadingPage loading={state.loading} />}
            <div className="signin__form">
                <div className="signin__form__left">
                    <div className="signin__header">
                        <h3>Welcome to Phoenix Shop</h3>
                    </div>
                    <div className="signin__IdpBox">
                        <div className="signin__Idp google">
                            <div className="signin__Idp__left">
                            <img src={Google} alt='Google' />
                            </div>
                            <div className="signin__Idp__right">
                                <p>Google</p>
                            </div>
                        </div>
                        <div className="signin__Idp microsoft"
                            onClick={(e) => handleMsalLogin(instance)}>
                            <div className="signin__Idp__left">
                                <img src={Microsoft} alt='Microsoft' />
                            </div>
                            <div className="signin__Idp__right">
                                <p>Microsoft</p>
                            </div>
                        </div>
                    </div>
                    <div className="signin__separator">
                        <hr id='hr1' />
                        <p>or</p>
                        <hr id='hr2'/>
                    </div>
                    <div className="signin__infobox">
                        <div className="signin__info">
                            <input
                                type='text'
                                id={`${state.err.email ? 'error' : ''}`}
                                placeholder='Enter Email Address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {signin()}
                                }}
                            />
                            <div className={`signin__info__error ${state.err.email ? 'show' : ''}`}>
                                <ErrorIcon />
                                <p>{state.err.email && state.err.email}</p>
                            </div>
                        </div>
                        <div className='signin__info'>
                            <div className='password' id={`${state.err.password ? 'error' : ''}`}>
                                <input
                                    name='input-password'
                                    type={visiblePassword ? 'text' : 'password'}
                                    placeholder='Enter Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {signin()}
                                    }}
                                />
                                { visiblePassword
                                    ? <VisibilityOffIcon
                                        onClick={() => setVisiblePassword(false)} />
                                    : <VisibilityIcon
                                        onClick={() => setVisiblePassword(true)} /> }
                            </div>
                            <div className={`signin__info__error ${state.err.password ? 'show' : ''}`}>
                                <ErrorIcon />
                                <p>{state.err.password && state.err.password}</p>
                            </div>
                        </div>
                    </div>
                    <div className="remember">
                        <input
                            type='checkbox'
                            onChange={() => setRemember(!remember)}
                        />
                        <label>Remember Me</label>
                    </div>
                    <div className='signin__button'>
                        <button onClick={() => signin()}>
                            SIGN IN
                        </button>
                    </div>
                    <div className="signin__footer">
                        <span id='label'>New customer?</span>
                        <a href={`/signup?redirect=${redirect}`}>Create New Account</a>
                    </div>
                </div>
                <div className="signin__form__right">
                    <img src={onlineshop} alt='onlineshop' />
                </div>
            </div>
        </div>
    );
}

export default SignIn2;