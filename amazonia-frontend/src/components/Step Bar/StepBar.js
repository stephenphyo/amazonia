import React from 'react';
import './StepBar.css';

function StepBar(props) {
  return (
    <div className='stepbar__container'>
      <div className={`step ${props.step1 ? 'active' : ''}`}>Shopping Cart</div>
      <div className={`step ${props.step2 ? 'active' : ''}`}>Shipping Address</div>
      <div className={`step ${props.step3 ? 'active' : ''}`}>Payment Methods</div>
      <div className={`step ${props.step4 ? 'active' : ''}`}>Checkout</div>
    </div>
  );
}

export default StepBar;