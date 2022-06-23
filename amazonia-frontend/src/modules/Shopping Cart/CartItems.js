import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CartItems.css';

/* MUI Imports */
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

/* Data Store Imports */
import { DataStore } from 'data/DataStore';

function CartItems() {

    /* Data Store */
    const { state, dispatch: ctxDispatch } = useContext(DataStore);
    const { cart: { cartItems: items } } = state;

    /* Delete This */
    useEffect(() => {
        if (localStorage.getItem('cartItems')) {
            console.log(items);
            console.log('Changed')
        }
    }, [localStorage.getItem('cartItems')])

    /* Functions */
    const updateCartItem = (item, itemQty) => {
        ctxDispatch({
            type: 'ADD_TO_CART',
            payload: { ...item, itemQty }
        })
    }

    const deleteFromCart = (itemId) => {
        ctxDispatch({
            type: 'DELETE_FROM_CART',
            payload: itemId
        });
    }

    return (
        <div className="cart__items">
            {
                items.length === 0
                    ?
                    <div className='empty-cart'>
                        <p>
                            Shopping Cart is Empty.
                            <Link to='/'>
                                <span>Go to shopping</span>
                            </Link>
                        </p>
                    </div>
                    :
                items.map((item) => (
                    <div className='item__row' key={item.id}>
                        <div className='item__image'>
                            <img
                                src={item.coverImage}
                                alt={item.id}
                            />
                        </div>
                        <div className="item__description">
                            {item.name}
                        </div>
                        <div className="item__price">
                            <div className="item__priceContainer">
                                <p className='new'>{`$ ${item.price}`}</p>
                                <p className='original'>{`$ ${item.orgPrice}`}</p>
                            </div>
                        </div>
                        <div className="item__count">
                            <button
                                className='btn-count down'
                                onClick={() => updateCartItem(item, item.itemQty-1)}
                                disabled={item.itemQty === 1}
                            >
                                <RemoveCircleIcon />
                            </button>
                            <input
                                value={item.itemQty}
                            />
                            <button
                                className="btn-count up"
                                onClick={() => updateCartItem(item, item.itemQty+1)}
                                disabled={item.itemQty === item.inStock}
                            >
                                <AddCircleIcon />
                            </button>
                        </div>
                        <div className="item__delete">
                            <DeleteIcon
                                onClick={() => deleteFromCart(item.id)}
                            />
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default CartItems;