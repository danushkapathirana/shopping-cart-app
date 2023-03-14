import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { uiActions } from "./store/ui-slice";

let isInitial = true

const App = () => {
  const showCart = useSelector((state) => state.ui.cartIsVisible)
  const cart = useSelector((state) => state.cart)
  const notification = useSelector((state) => state.ui.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    const sendCartData = async () => {

      dispatch(uiActions.showNotification({status: 'pending', title: 'Sending...', message: 'Sending cart data!'}))

      const response = await fetch(
        'https://shopping-cart-app-b19c5-default-rtdb.firebaseio.com/cart.json', 
        {method: 'PUT', body: JSON.stringify(cart)
      })
  
      if(!response.ok) {
        throw new Error('Sending cart data is failed!')
      }

      // const responseData = await response.json()
      dispatch(uiActions.showNotification({status: 'success', title: 'Success', message: 'Send cart data successfully!'}))
    }

    if(isInitial) { //avoid sending the empty data when the application starts
      isInitial = false
      return
    }

    sendCartData().catch((err) => {
      dispatch(uiActions.showNotification({status: 'error', title: 'Error', message: 'Sending cart data failed!'}))
    })

  }, [cart, dispatch])
  
  return(
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  )
}

export default App
