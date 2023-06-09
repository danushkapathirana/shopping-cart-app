import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from "./store/cart-slice";

let isInitial = true

const App = () => {
  const showCart = useSelector((state) => state.ui.cartIsVisible)
  const cart = useSelector((state) => state.cart)
  const notification = useSelector((state) => state.ui.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCartData())

  }, [dispatch])

  useEffect(() => {
    if(isInitial) { //avoid sending the empty data when the application starts
      isInitial = false
      return
    }

    if(cart.changed) { //avoid sending cart data to firebase when starts the application; think with line 18 <-> 21
      dispatch(sendCartData(cart))
    }

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
