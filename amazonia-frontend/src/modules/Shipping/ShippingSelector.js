import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import './ShippingSelector.css';

/* Data Store Import */
import { DataStore } from 'data/DataStore';

function ShippingSelector() {

    /* useNavigate */
    const navigate = useNavigate();

    /* Data Store */
    const { state } = useContext(DataStore);
    const { shippingAddresses } = state;
    const { fullName, mobile, address1 } = shippingAddresses;
    const { address2, city, country, postal } = shippingAddresses;

    console.log(state)

    /* Functions */
    const addNewShipping = () => {
        navigate('/shipping/new');
    }

    return (
        <div className='shippingAddr__container'>
            <Helmet>
                <title>Select Shipping Address</title>
            </Helmet>
            <div className='shipping__container'>
                <div className="shipping__form">
                    <div className="shipping__newBox__container">
                        <div
                            className="shipping__newBox"
                            onClick={() => addNewShipping()}
                        >
                            + Add New Address
                        </div>
                    </div>
                    <div className="shipping__body">
                        <div className="shipping__address_container">
                            <div className="shipping__address__layer1">
                                <div id='left'>
                                    <p>{fullName}</p>
                                    <p>{mobile}</p>
                                </div>
                                <div id='right'>
                                    <a href='/shipping'>Edit</a>
                                </div>
                            </div>
                            <div className="shipping__address__layer2">
                                <p>
                                    {
                                        `${address1}${address2 && `, ${address2}`},
                                        ${city}, ${country}, (${postal})`
                                    }
                                </p>
                            </div>
                            <div className="shipping__address__layer3">
                                <p>Default Shipping Address</p>
                            </div>
                        </div>
                        <div className="shipping__address_container">
                            <div className="shipping__address__layer1">
                                <div id='left'>
                                    <p>{fullName}</p>
                                    <p>{mobile}</p>
                                </div>
                                <div id='right'>
                                    <a href='/shipping'>Edit</a>
                                </div>
                            </div>
                            <div className="shipping__address__layer2">
                                <p>
                                    {
                                        `${address1}${address2 && `, ${address2}`},
                                        ${city}, ${country} (${postal})`
                                    }
                                </p>
                            </div>
                            <div className="shipping__address__layer3">
                                <p>Default Shipping Address</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShippingSelector;