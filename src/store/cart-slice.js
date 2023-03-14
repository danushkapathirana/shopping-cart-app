import { uiActions } from "./ui-slice";

const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
    name: 'cart',
    initialState: {items: [], totalQuantity: 0, changed: false},
    reducers: {
        replaceCart(state, action) {
            state.items = action.payload.items
            state.totalQuantity = action.payload.totalQuantity
        },

        addItemToCart(state, action) {
            const newItem = action.payload
            const existingItem = state.items.find((item) => item.id === newItem.id)
            state.totalQuantity++
            state.changed = true
            if(!existingItem) {
                state.items.push({id: newItem.id, price: newItem.price, quantity: 1, totalPrice: newItem.price, name: newItem.title})
            }
            else {
                existingItem.quantity++
                existingItem.totalPrice = existingItem.totalPrice + newItem.price
            }
        },
        
        removeItemFromCart(state, action) {
            const id = action.payload
            const existingItem = state.items.find((item) => item.id === id)
            state.totalQuantity--
            state.changed = true
            if(existingItem.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== id)
            }
            else {
                existingItem.quantity--
                // existingItem.totalPrice = existingItem.totalPrice - existingItem.price
            }
        }
    }
})

// create a action creator (action creator thunk)
export const sendCartData = (cart) => {
    return async (dispatch) => {

        dispatch(uiActions.showNotification({status: 'pending', title: 'Sending...', message: 'Sending cart data!'}))

        const sendRequest = async () => {
            const response = await fetch(
                'https://shopping-cart-app-b19c5-default-rtdb.firebaseio.com/cart.json', 
                {method: 'PUT', body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity})
            })
    
            if(!response.ok) {
                throw new Error('Sending cart data is failed!')
            }
        }
        try {
            await sendRequest()
            dispatch(uiActions.showNotification({status: 'success', title: 'Success', message: 'Send cart data successfully!'}))
        }
        catch(err) {
            dispatch(uiActions.showNotification({status: 'error', title: 'Error', message: 'Sending cart data failed!'}))
        }
    }
}

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async() => {
            const response = await fetch('https://shopping-cart-app-b19c5-default-rtdb.firebaseio.com/cart.json')

            if(!response.ok) {
                throw new Error('Could not fetch cart data!')
            }
            const data = await response.json()
            return data
        }
        try {
            const cartData = await fetchData()
            dispatch(cartActions.replaceCart({items: cartData.items || [], totalQuantity: cartData.totalQuantity}))
        }
        catch(err) {
            dispatch(uiActions.showNotification({status: 'error', title: "Error", message: 'Fetching cart data is failed!'}))
        }
    }
}

export const cartActions = cartSlice.actions
export default cartSlice
