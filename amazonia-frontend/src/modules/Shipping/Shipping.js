import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import './Shipping.css';

/* Component Imports */
import StepBar from 'components/Step Bar/StepBar';

/* MUI Imports */
import ErrorIcon from '@mui/icons-material/Error';

/* Data Store Imports */
import { DataStore } from 'data/DataStore';

function Shipping() {

    /* Data Store */
    const { state, dispatch: ctxDispatch } = useContext(DataStore);
    const { userInfo } = state;

    /* useState */
    const [fullName, setFullName] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [postal, setPostal] = useState('');
    const [country, setCountry] = useState('');
    const [mobile, setMobile] = useState('');
    const [err, setError] = useState({});
    const errObj = {};

    /* useNavigate */
    const navigate = useNavigate();

    /* useEffect */
    useEffect(() => {
        if (!userInfo) {
            navigate('/signin');
        }
    }, [userInfo, navigate]);

    useEffect(() => {
        if (localStorage.getItem('shippingAddresses')) {
            const local = JSON.parse(localStorage.getItem('shippingAddresses'));
            setFullName(local.fullName);
            setAddress1(local.address1);
            setAddress2(local.address2);
            setCity(local.city);
            setPostal(local.postal);
            setCountry(local.country);
            setMobile(local.mobile);
        }
    }, []);

    // useEffect(() => {
    //     if (localStorage.getItem('shippingAddresses')) {
    //         console.log('It exists');
    //         setName(JSON.parse(localStorage.getItem('shippingAddresses')).name);
    //     }
    // });

    /* Functions */
    const checkError = () => {
        if (fullName === '') {
            errObj['fullName'] = 'Shipping Name must not be empty';
        }
        if (address1 === '') {
            errObj['address'] = 'Please enter your shipping address';
        }
        if (city === '') {
            errObj['city'] = 'Please enter your city';
        }
        if (country === '') {
            errObj['country'] = 'Please enter your contry';
        }
        if (mobile === '') {
            errObj['mobile'] = 'Please enter your mobile number';
        }
    }

    const shipping = () => {
        checkError();
        console.log(errObj);
        console.log(fullName);
        console.log(country);
        if (Object.keys(errObj).length === 0) {
            const shippingData = {
                fullName: fullName,
                address1: address1,
                address2: address2,
                city: city,
                postal: postal,
                country: country,
                mobile: mobile
            }
            ctxDispatch({
                type: 'SAVE_SHIPPING_ADDRESSES',
                payload: shippingData
            });
            navigate(`${localStorage.getItem('paymentMethod')
                ? '/checkout'
                : '/payment'
                }`);
        } else {
            setError(errObj);
        }
    }

    const back = () => {
        navigate('/cart');
    }

    return (
        <div className='shippingAddr'>
            <Helmet>
                <title>New Shipping Address</title>
            </Helmet>
            <StepBar step1 step2 />
            <div className="shippingAddr__form">
                <div className="shippingAddr__header">
                    <h3>SHIPPING ADDRESS</h3>
                </div>
                <div className="shippingAddr__infobox">
                    <div className="shippingAddr__info">
                        <label>Full Name</label>
                        <input
                            className='input-fullname'
                            type='text'
                            placeholder='Enter Full Name'
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        {
                            err.fullName &&
                            <div className="shippingAddr__info__error">
                                <ErrorIcon />
                                <p>{err.fullName}</p>
                            </div>
                        }
                    </div>
                    <div className="shippingAddr__info">
                        <label>Address Line 1</label>
                        <input
                            className='input-address1'
                            type='text'
                            placeholder='Address Line 1'
                            value={address1}
                            onChange={(e) => setAddress1(e.target.value)}
                        />
                        {
                            err.address &&
                            <div className="shippingAddr__info__error">
                                <ErrorIcon />
                                <p>{err.address}</p>
                            </div>
                        }
                    </div>
                    <div className="shippingAddr__info">
                        <label>Address Line 2 [Optional]</label>
                        <input
                            className='input-address2'
                            type='text'
                            placeholder='Address Line 2'
                            value={address2}
                            onChange={(e) => setAddress2(e.target.value)}
                        />
                    </div>
                    <div className="shippingAddr__info">
                        <label>City</label>
                        <input
                            className='input-city'
                            type='text'
                            placeholder='City'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        {
                            err.city &&
                            <div className="shippingAddr__info__error">
                                <ErrorIcon />
                                <p>{err.city}</p>
                            </div>
                        }
                    </div>
                    <div className="shippingAddr__info">
                        <label>Postal Code</label>
                        <input
                            className='input-postal'
                            type='text'
                            placeholder='Postal Code'
                            value={postal}
                            onChange={(e) => setPostal(e.target.value)}
                        />
                    </div>
                    <div className="shippingAddr__info">
                        <label>Country</label>
                        <input
                            className='input-country'
                            type='text'
                            placeholder='Country'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        {
                            err.country &&
                            <div className="shippingAddr__info__error">
                                <ErrorIcon />
                                <p>{err.country}</p>
                            </div>
                        }
                    </div>
                    <div className="shippingAddr__info">
                        <label>Mobile Number</label>
                        <input
                            className='input-mobile'
                            type='text'
                            placeholder='Mobile Number'
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                        {
                            err.mobile &&
                            <div className="shippingAddr__info__error">
                                <ErrorIcon />
                                <p>{err.mobile}</p>
                            </div>
                        }
                    </div>
                </div>
                <div className='shippingAddr__button'>
                    <button id='back' onClick={() => back()}>Back</button>
                    <button onClick={() => shipping()}>Continue</button>
                </div>
            </div>
        </div>
    );
}

export default Shipping;