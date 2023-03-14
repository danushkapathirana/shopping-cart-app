import React from "react";

import classes from '../UI/Card.module.css'

const Card = (props) => {
  return(
    <section className={`${classes.card} ${props.className ? props.className : ''}`}>
      {props.children}
    </section>
  )
}

export default Card
