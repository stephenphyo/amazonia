import { createContext, useReducer } from "react";

/* Utility Imports */
import Axios from 'utils/Axios';

export const DataStore = createContext();

/* Reducer Function */
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(
                item => item.id === newItem.id
            );
            const cartItems = existItem
                ? state.cart.cartItems.map(item =>
                    item.id === existItem.id ? newItem : item
                )
                : [...state.cart.cartItems, newItem];

            /* Save Cart Items in Local Storage */
            /* 'LocalStorage' object allows to save key/value pairs in the browser */
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return {
                ...state,
                cart: { ...state.cart, cartItems }
            }
        }

        case 'DELETE_FROM_CART': {
            const cartItems = state.cart.cartItems.filter(
                item => item.id !== action.payload
            )
            /* Save Cart Items in Local Storage */
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return {
                ...state,
                cart: { ...state.cart, cartItems }
            }
        }

        case 'USER_SIGNIN': {
            return { ...state, userInfo: action.payload/*, cart: { ...state.cart, res.data.cartItems } */};
        }

        case 'INITIAL_CART_ITEMS': {
            const cartItems = action.payload;
            return {
                ...state,
                cart: { ...state.cart, cartItems }
            }
        }

        case 'USER_SIGNOUT': {
            // Before signing out, send Cart Items to MongoDB
            Axios.post('/carts', {
                userid: state.userInfo.userid,
                cartItems: state.cart.cartItems
            });
            let removeItems = ['userInfo', 'cartItems']
            removeItems.forEach(item => localStorage.removeItem(item));
            return {
                ...state,
                userInfo: null, cart: { cartItems: [] }
            };
        }

        case 'SAVE_SHIPPING_ADDRESSES': {
            const newAddr = action.payload;
            // const updatedAddr = [...state.shippingAddresses, newAddr];
            // localStorage.setItem('shippingAddresses', JSON.stringify(updatedAddr));
            // return {
            //     ...state,
            //     shippingAddresses: updatedAddr
            // }

            // console.log(newAddr);
            // console.log(updatedAddr);
            // console.log(localStorage.getItem('shippingAddresses'));

            // Temp
            localStorage.setItem('shippingAddresses', JSON.stringify(newAddr));
            return {
                ...state,
                shippingAddresses: newAddr
            }
        }

        case 'SAVE_PAYMENT_METHOD': {
            localStorage.setItem('paymentMethod', action.payload);
            return {...state, paymentMethod: action.payload}
        }

        case 'CART_CLEAR': {
            // After placing order, empty Cart Items data in the database
            Axios.post('/carts', {
                userid: state.userInfo.userid,
                cartItems: []
            });
            return { ...state, cart: { ...state.cart, cartItems: [] } }
        }

        default:
            return state;
    }
}

const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : []
    },
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    shippingAddresses: localStorage.getItem('shippingAddresses')
        ? JSON.parse(localStorage.getItem('shippingAddresses'))
        : null,
    paymentMethod: localStorage.getItem('paymentMethod')
        ? localStorage.getItem('paymentMethod')
        : null,
};

function DataStoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <DataStore.Provider value={value}>{props.children}</DataStore.Provider>
}

export default DataStoreProvider;
