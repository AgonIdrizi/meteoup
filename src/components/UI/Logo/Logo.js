import React from 'react';
import Logo from '../../../assets/images/meteoup-2.png'
import classes from './Logo.module.scss';

const logo = () => (
    <div className={classes.Logo}>
      <img src={Logo} />
    </div>
)

export default logo;