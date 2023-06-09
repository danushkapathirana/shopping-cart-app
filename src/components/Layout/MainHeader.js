import React from 'react';

import CartButton from '../Cart/CartButton';

import classes from '../Layout/MainHeader.module.css'

const MainHeader = (props) => {
  return(
    <header className={classes.header}>
      <h1>Redux Cart</h1>
      <nav>
        <ul>
          <li><CartButton /></li>
        </ul>
      </nav>
    </header>
  )
}

export default MainHeader
