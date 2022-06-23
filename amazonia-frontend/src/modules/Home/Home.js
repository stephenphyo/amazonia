import React, { useState, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import './Home.css';

/* Module Imports */
import Product from 'modules/Home/Product';

/* Utility Imports */
import Axios from 'utils/Axios.js';

/* Component Imports */
import LoadingPage from 'components/Loading Page/LoadingPage';

/* Dev Imports */
// import logger from 'use-reducer-logger';


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
    }
};

function Home() {

    const [{ products, loading, error }, dispatch] = useReducer(reducer, {
        products: [],
        loading: true,
        error: ''
    });

    useEffect(() => {
        const fetch = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const fetchdata = await Axios.get('/products');
                dispatch({ type: 'FETCH_SUCCESS', payload: fetchdata.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        };
        fetch();
    }, []);

    return (
        <div className="home">
            <Helmet>
                <title>Amazonia</title>
            </Helmet>
            <div className="home__containter">
                <div className="home__header">
                    <img
                        src='https://c4.wallpaperflare.com/wallpaper/37/460/865/star-trek-beyond-wallpaper-preview.jpg' />
                </div>
                <div className="home__products">
                    {
                        loading
                            ? (<LoadingPage loading={loading} />)
                            : error
                                ? (<div>{error}</div>)
                                : (
                                    products.map((product) => (
                                        <Product
                                            key={product.id}
                                            item={product}
                                        />
                                    ))
                                )
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;