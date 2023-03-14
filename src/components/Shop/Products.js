import React from "react";

import ProductItem from "./ProductItem";

import classes from '../Shop/Products.module.css'

const DUMMY_PRODUCTS = [
  {id: 'p1', price: 6, title: 'Banana', description: 'A banana is an elongated, edible fruit'},
  {id: 'p2', price: 10, title: 'Mango', description: 'A mango is an edible stone fruit'},
]

const Products = (props) => {
  return(
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => <ProductItem key={product.id} id={product.id} title={product.title} price={product.price} description={product.description} />)}
      </ul>
    </section>
  )
}

export default Products
