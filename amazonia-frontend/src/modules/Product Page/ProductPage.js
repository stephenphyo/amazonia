import React, { useReducer, useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './ProductPage.css';

/* MUI Imports */
import CircularProgress from '@mui/material/CircularProgress';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

/* Utility Imports */
import Axios from 'utils/Axios';

/* Component Imports */
import Rating from 'components/Rating/Rating.js';

/* Data Store Import */
import { DataStore } from 'data/DataStore.js';

/* Dev Imports */
// import logger from 'use-reducer-logger';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, product: action.payload };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function ProductPage() {

    /* useParams */
    const params = useParams();
    const { id: product_id } = params;

    /* Data Store */
    const { state, dispatch: ctxDispatch } = useContext(DataStore);
    const { cart } = state;

    /* useState */
    const [qty, setQty] = useState(1);
    const [stockAvailable, setStockAvailable] = useState();

    /* useReducer */
    const [{ product, loading, error }, dispatch] = useReducer(reducer, {
        product: [],
        loading: false,
        error: ''
    });

    /* useNavigate */
    const navigate = useNavigate();

    /* useEffect */
    useEffect(() => {
        const fetch = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const fetchdata = await Axios.get(`/products/id/${product_id}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: fetchdata.data });
                setStockAvailable(fetchdata.data.inStock)
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        };
        fetch();
    }, [product_id]);

    /* Functions */
    const decQty = () => {
        if (qty > 1) {
            setQty(qty - 1);
        }
    }

    const incQty = () => {
        if (qty < product.inStock) {
            setQty(qty + 1);
        }
    }

    const addToCart = () => {
        const existItem = cart.cartItems.find((x) => x.id === product.id);
        const itemQty = existItem ? existItem.itemQty + 1 : 1;
        ctxDispatch({
            type: 'ADD_TO_CART',
            payload: { ...product, itemQty }
        });
        setStockAvailable(product.inStock - qty);
    }

    const buyNow = () => {
        navigate('/cart');
    }

    return (
        <div className='product-page'>
            <Helmet>
                <title>{product.name}</title>
            </Helmet>
            <div className={`loading-page ${loading ? 'visible' : 'hidden'}`}>
                <CircularProgress />
            </div>
            <div className="product-page__container">
                <div className='product-page__photos'>
                    <div className="product-page__photos__large">
                        <img
                            src={product.coverImage}
                            alt={product.name}
                        />
                    </div>
                    <div className="product-page__photos__small-container">
                        {/*  useReducer() uses several actions, and in previous action states,
                              product object may be empty. In such states, iterating the smallImages
                              array using map() function will result an error. Thus, product
                              object should be check first whether it is empty or not*/}
                        {product.length !== 0 && (
                            product.smallImages.map((img) => (
                                <div className="product-page__photos__small">
                                    <img
                                        src={img}
                                        alt={product.name}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="product-page__infos">
                    <div className="product-header">
                        <h3>{product.name}</h3>
                        <h5>{product.description}</h5>
                    </div>
                    <div className="product-rating">
                        <Rating rating={product.rating} />
                        <span id='reviews'> ({product.reviews})</span>
                    </div>
                    <div className="product-price">
                        <p id='current'>$ {product.price}</p>
                        <p>
                            <span id='original'>$ {product.orgPrice}</span>
                            <span id='discount'>-{
                                Math.round(((product.orgPrice-product.price)/product.orgPrice)*100)} %
                            </span>
                        </p>
                    </div>
                    {
                        product.inStock !== 0
                            ? <div className="product-inStock isInStock">In Stock</div>
                            : <div className="product-inStock isSoldOut">Sold Out</div>
                    }
                    <div className="product-stock">
                        <p id='label'>Quantity</p>
                        <button
                            className='counter down'
                            disabled = {qty === 1}
                        >
                            <IndeterminateCheckBoxIcon
                                onClick={() => decQty()}
                            />
                        </button>
                        <input
                            id = 'count'
                            value={qty}
                            onChange={e => setQty(e.target.value)}
                        />
                        <button
                            className='counter up'
                            disabled = {qty === product.inStock || product.inStock === 0}
                        >
                            <AddBoxIcon
                                onClick={() => incQty()}
                            />
                        </button>
                        <p id='inStock'>Only {product.inStock} items left</p>
                    </div>
                    {
                        product.inStock !== 0
                        ?
                            <div className='buttons'>
                                <button className='sel_btn buyNow' onClick={() => buyNow()}>BUY NOW</button>
                                <button className='sel_btn addCart' onClick={() => addToCart()} disabled={stockAvailable === 0}>ADD TO CART</button>
                            </div>
                        :
                            <div className='buttons'>
                                <button className='btn-soldOut' onClick={e => console.log("SOLD OUT")}>SOLD OUT</button>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductPage;