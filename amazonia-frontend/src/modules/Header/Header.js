import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

/* Module Imports */
import DropDown from 'modules/Header/DropDown';

/* MUI Imports */
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

/* Data Store Import */
import { DataStore } from 'data/DataStore';

function Header() {

    /* Data Store */
    const { state } = useContext(DataStore);
    const { cart, userInfo } = state;
    const itemCount = cart.cartItems ? cart.cartItems.length : 0;

    /* useState */
    const [dropdown, setDropdown] = useState(false);
    const [nameText, setNameText] = useState('');

    /* Drop Down Control */
    const Ref = useRef(null);

    const closeDropdown = (e) => {
        if (Ref.current
            && dropdown
            // && !Ref.current.contains(e.target)
            && e.target.className !== 'dropdown__list') {
            setDropdown(false);
        }
        document.removeEventListener('mousedown', closeDropdown);
    };

    if (dropdown) {
        document.addEventListener('mousedown', closeDropdown);
    }

    /* Functions */
    const getFontSize = (textLength) => {
        const baseFontSize = 15
        const baseLength = 6
        let diffFontSize = 0
        if (textLength > baseLength) {
            let diff = textLength - baseLength;
            diffFontSize = Math.ceil(diff / 2);
        }
        const fontSize = baseFontSize - diffFontSize;
        return `${fontSize}px`;
    }

    // Delete this
    useEffect(() => {
        console.log(`User Info in Data Layer: ${JSON.stringify(userInfo)}`);
        console.log(`Cart Items in Data Layer ${JSON.stringify(cart)}`);
        console.log(`Cart Items in Data Layer ${JSON.stringify(cart.cartItems)}`);
    })

    useEffect(() => {
        setNameText(document.getElementById('pfName').textContent.length);
    }, []);

  return (
    <div className='header'>
        <Link to='/'>
            <img
                className='header__logo'
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png'
            />
        </Link>
        <div className='header__search'>
            <input
                className='header__searchInput'
                  type='text'
                  placeholder='Search in Amazonia'
            />
              <SearchIcon className='header__searchIcon' />
        </div>
        <div className='header__options'>
            <Link to='/cart' style={{ textDecoration: 'none' }} >
                <div className='header__option cartIcon'>
                    <ShoppingCartIcon />
                    <div className={`itemCount ${itemCount > 0 ? 'visible' : ''}`}>
                        <span>{itemCount}</span>
                    </div>
                </div>
            </Link>
            {
                userInfo
                      ?
                      <div className='header__option signin'>
                          <div className='dropdown-container'>
                              <div
                                  ref={Ref}
                                  className='dropdown-btn'
                                  onClick={() => setDropdown(!dropdown)}>
                              <span id='pfName' style={{fontSize: `${getFontSize(nameText)}`}}>
                                {userInfo.firstName === '' ? 'User' : userInfo.firstName }
                                </span>
                                  {
                                      dropdown
                                          ? <ArrowDropUpIcon />
                                          : <ArrowDropDownIcon />
                                  }
                              </div>
                              {
                                dropdown
                                  && <DropDown dropdown={dropdown} setDropdown={setDropdown} />
                              }
                          </div>
                      </div>
                      :
                      <div className='header__option signin'>
                          <Link
                              to='/signin'
                              style={{ textDecoration: 'none', display: 'flex', color: 'white' }} >
                              <span id='pfName' style={{fontSize: `${getFontSize(nameText)}`}}>
                                Sign In
                                </span>
                          </Link>
                      </div>
              }
            <div className='header__option'>
                <Avatar
                      sx={{ height: 35, width: 35 }}
                      src='https://media.vanityfair.com/photos/575026f2c0f054944b554e89/master/pass/506802698.jpg'
                      alt='Stephen Phyo'
                />
            </div>
        </div>
    </div>
  )
}

export default Header;