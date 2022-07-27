import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* Component Imports */
import Header from 'modules/Header/Header';
import Home from 'modules/Home/Home.js';
import Cart from 'modules/Shopping Cart/Cart';
import ProductPage from 'modules/Product Page/ProductPage';
import SignIn from './SignIn2.js';
import SignUp from './SignUp.js';
import Shipping from 'modules/Shipping/Shipping';
import ShippingSelector from 'modules/Shipping/ShippingSelector';
import Profile from 'modules/Profile/Profile';
import Payment from 'modules/Payment/Payment';
import Checkout from 'modules/Checkout/Checkout';
import Order from 'modules/Order/Order';
import OrderHistory from 'modules/Order/OrderHistory';

/* Temp */
import Idp from './tests/Idp';
import Arrow from './tests/Arrow';
import Modal from './tests/Modal';
import ImageUploader from './tests/ImageUploader';
import Gallery from './tests/Gallery';
import Tester from './tests/Tester';

/* CSS Imports */
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="app__header">
          <Header />
        </div>
        <div className="app__body">
          {/* In react-router-dom v6, "Switch" is replaced by routes "Routes". */}
          <Routes>
            <Route path='/' element={ <Home /> }/>
            <Route path='/product/id/:id' element={<ProductPage />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/cart' element={ <Cart /> } />
            <Route path='/shipping' element={<Shipping />} />
            <Route path='/shipping/new' element={<ShippingSelector />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/orders' element={<OrderHistory />} />
            <Route path='/orders/:id' element={<Order />} />

            {/* Testings */}
            <Route path='/idp' element={<Idp />} />
            <Route path='/arrow' element={<Arrow />} />
            <Route path='/modal' element={<Modal />} />
            <Route path='/imgupload' element={<ImageUploader />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/tester' element={<Tester />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;