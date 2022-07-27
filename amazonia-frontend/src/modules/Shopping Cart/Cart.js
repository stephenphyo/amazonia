import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Cart.css';

/* Module Imports */
import CartItems from './CartItems.js';
import CartSubtotal from './CartSubtotal.js';

/* Component Imports */
import StepBar from 'components/Step Bar/StepBar';

/* Data Store Import */
import { DataStore } from 'data/DataStore.js';

function Cart() {

    /* useNavigate */
    const navigate = useNavigate();

    /* Data Store */
    const { state } = useContext(DataStore);
    const { userInfo } = state;

    /* useEffect */
    useEffect(() => {
        if (!userInfo) {
            navigate('/signin?redirect=/cart');
        }
    });

  return (
      <div className='cart'>
          <Helmet>
                <title>Shopping Cart</title>
          </Helmet>
          <StepBar step1 />
          <div className="cart__container">
              <h2>Shopping Cart</h2>
              <div className="cart__body">
                  <CartItems />
                  <CartSubtotal />
              </div>
          </div>
      </div>
    );
}

export default Cart;