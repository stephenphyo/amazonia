import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './SignUp.css';

/* Utility Imports */
import Axios from 'utils/Axios.js';

/* MUI Imports */
import ErrorIcon from '@mui/icons-material/Error';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

/* Data Store Imports */
import { DataStore } from 'data/DataStore';

/* Component Imports */
/* Component Imports */
import LoadingPage from 'components/Loading Page/LoadingPage';

const reducer = (state, action) => {
    switch (action.type) {
        case 'SIGNUP_REQUEST':
            return { ...state, loading: true };
        case 'SIGNUP_SUCCESS':
            return { ...state, loading: false };
        case 'SIGNUP_FAIL':
            return { ...state, loading: false, err: action.payload };
        case 'SHOW_ERROR':
            return { ...state, err: action.payload};
        case 'CLEAR_ERROR':
            return { ...state, err: {} };
        default:
            return state;
    }
};

const initialState = { loading: false, err: {} }

function SignUp() {

    /* useState */
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [initPwd, setInitPwd] = useState('');
    const [cfmPwd, setCfmPwd] = useState('');
    const [gender, setGender] = useState('');
    const [visiblePassword, setVisiblePassword] = useState(false);
    let errObj = {};

    /* useNavigate */
    const navigate = useNavigate();

    /* useReducer */
    const [state, dispatch] = useReducer(reducer, initialState);

    /* Redirection */
    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : '/signin';

    /* Data Store */
    const { state: ctxState } = useContext(DataStore);
    const { userInfo } = ctxState;

    /* useEffect */
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    });

    useEffect(() => {
        dispatch({ type: 'CLEAR_ERROR' });
    }, [firstName, lastName, email, initPwd, cfmPwd, gender]);

    /* Functions */
    const checkPassword = () => {
        if (initPwd === "") {
            errObj['initPwd'] = "Password must not be empty";
        }
        else if (initPwd.length < 8) {
            errObj['initPwd'] = "Password length must be 8 or above";
        }
        else if (initPwd !== "" && initPwd !== cfmPwd) {
            errObj['initPwd'] = "Passwords do not match";
        }
    }

    const checkEmail = () => {
        var regex = /\S+@\S+.[a-z]{2,}$/;
        if (email === "") {
          errObj['email'] = "Email must not be empty";
        }
        else if (!regex.test(email)) {
          errObj['email'] = "Please enter valid email address";
        };
    }

    const checkGender = () => {
        if (gender === "") {
            errObj['gender'] = 'Please select a gender';
        }
    }

    const signup = async() => {
        // Error Checking
        checkPassword();
        checkEmail();
        checkGender();

        console.log(`Error: ${JSON.stringify(errObj)}`);

        if (Object.keys(errObj).length === 0) {
            dispatch({ type: "SIGNUP_REQUEST" });
            await Axios.post('/users/signup', {
                fname: firstName,
                lname: lastName,
                email: email,
                password: cfmPwd,
                gender: gender
            }).then((res) => {
                if (res.status === 201) {
                    dispatch({ type: "SIGNUP_SUCCESS" });
                    localStorage.setItem('email', email);
                    navigate('/signin');
                }
            }).catch((err) => {
                dispatch({ type: "SIGNUP_FAIL", payload: err.message });
                console.log(err.message);
            })
        } else {
            dispatch({
                type: 'SHOW_ERROR',
                payload: errObj
            });
            // setInitPwd("");
            // setCfmPwd("");
        }
    }

    return (
        <>
            <Helmet>
                <title>Sign Up Account</title>
            </Helmet>
            {state.loading && <LoadingPage loading={state.loading} />}
            <div className='signup__container'>
                <div className="signup__form">
                    <div className="signup__header">
                        <h3>CREATE ACCOUNT</h3>
                    </div>
                    <div className="signup__infobox">
                        <div className="signup__info__nameContainer">
                            <div className="signup__info name">
                                <label>First Name</label>
                                <input
                                    name='input-fname'
                                    type='text'
                                    placeholder='First Name'
                                    onChange={(e) => setFirstName(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {signup()}
                                    }}
                                />
                                <div className="signup__info__error">
                                    <p>hidden</p>
                                </div>
                            </div>
                            <div className="signup__info name">
                                <label>Last Name</label>
                                <input
                                    name='input-lname'
                                    type='text'
                                    placeholder='Last Name'
                                    onChange={(e) => setLastName(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {signup()}
                                    }}
                                />
                            </div>
                        </div>
                        <div className="signup__info">
                            <label>Email</label>
                            <input
                                name='input-email'
                                id={`${state.err.email ? 'error' : ''}`}
                                type='text'
                                placeholder='Enter Email Address'
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {signup()}
                                }}
                            />
                            <div className={`signup__info__error ${state.err.email ? 'show' : ''}`}>
                                    <ErrorIcon />
                                    <p>{state.err.email}</p>
                            </div>
                        </div>
                        <div className='signup__info'>
                            <label>Password</label>
                            <div className='password' id={`${state.err.initPwd ? 'error' : ''}`}>
                                <input
                                    name='input-initpwd'
                                    type={visiblePassword ? 'text' : 'password'}
                                    placeholder='Enter Password'
                                    value={initPwd}
                                    onChange={(e) => setInitPwd(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {signup()}
                                    }}
                                />
                                { visiblePassword
                                    ? <VisibilityOffIcon
                                        onClick={() => setVisiblePassword(false)} />
                                    : <VisibilityIcon
                                        onClick={() => setVisiblePassword(true)} /> }
                            </div>
                            <div className={`signup__info__error ${state.err.initPwd ? 'show' : ''}`}>
                                <ErrorIcon />
                                <p>{state.err.initPwd}</p>
                            </div>
                        </div>
                        <div className="signup__info">
                            <label>Confirm Password</label>
                            <input
                                name='input-cfmpwd'
                                type={visiblePassword ? 'text' : 'password'}
                                placeholder='Re-enter Password'
                                value={cfmPwd}
                                onChange={(e) => setCfmPwd(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {signup()}
                                }}
                            />
                            <div className="signup__info__error">
                                <p>hidden</p>
                            </div>
                        </div>
                        <div className='signup__info'>
                            <label>Gender</label>
                            <div className='gender' id={`${state.err.gender ? 'error' : ''}`}>
                                <select required onChange={(e) => setGender(e.target.value)}>
                                    <option value="" hidden>Select your gender</option>
                                    <option value="M" >Male</option>
                                    <option value="F" >Female</option>
                                    <option value="O" >Rather not to tell</option>
                                </select>
                                <ArrowDropDownIcon />
                            </div>
                            <div className={`signup__info__error ${state.err.gender ? 'show' : ''}`}>
                                <ErrorIcon />
                                <p>{state.err.gender}</p>
                            </div>
                        </div>
                    </div>
                    <div className='signup__button'>
                        <button onClick={() => signup()}>CREATE ACCOUNT</button>
                    </div>
                    <div className="signup__footer">
                        <span id='label'>Already have an account?</span>
                        <a href={`/signin?redirect=${redirect}`}>Sign In</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;