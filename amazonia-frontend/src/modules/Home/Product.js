import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Product.css';

/* Component Imports */
import Rating from 'components/Rating/Rating.js';

/* Data Store Import */
import { DataStore } from 'data/DataStore.js';

function Product({ item }) {

    /* Data Store Context */
    const { state, dispatch: ctxDispatch } = useContext(DataStore);
    const { userInfo } = state;

    /* useNavigate */
    const navigate = useNavigate();

    /* Functions */
    const addToCart = () => {
        ctxDispatch({
            type: 'ADD_TO_CART',
            payload: { ...item, itemQty: 1 }
        });
    }

    const buyNow = () => {
        addToCart();
        if (!userInfo) {
            navigate('/signin?redirect=/cart');
        } else {
            navigate('/cart');
        }
    }

    return (
        <div className="product" key={item.id}>
            <Link to={`/product/id/${item.id}`}>
                <div className="product__image">
                    <img
                        src={item.coverImage}
                        alt={item.name}
                    />
                </div>
            </Link>
            <div className="product__info">
                <span className='product__name'>{item.name}</span>
                <span className='product__price'>
                    <small>$</small>
                    <strong>{item.price}</strong>
                    <span id='original-price'>{`$${item.orgPrice}`}</span>
                </span>
                <span></span>
                <div className="product__rating">
                    <Rating rating={item.rating} />
                    <span id='reviews'> ({item.reviews})</span>
                </div>
            </div>
            {
                item.inStock === 0
                    ?
                    <div className="product__add">
                        <button id='soldOut'>Sold Out</button>
                    </div>
                    :
                    <div className="product__add">
                        <button id='buynow' onClick={() => buyNow()}>Buy Now</button>
                        <button onClick={() => addToCart()}>Add to Cart</button>
                    </div>
                }
            </div>
    );
}

export default Product;