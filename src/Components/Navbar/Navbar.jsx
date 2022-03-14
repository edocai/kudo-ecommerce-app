import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
import useStyles from './styles';


const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    const location = useLocation(); 

    return (
    <div>
        <AppBar position='fixed' className={classes.appBar} color='inherit'>
            <Toolbar>
                <Typography component={Link} to='/' style={{position: 'fixed',
       left: '45%',
}} variant='h6' className={classes.title} color='inherit'>
                    <img src={logo} alt='E-Commerce' height='28px' className={classes.img} />
                    <h2 style={{paddingLeft: '10px'}} >KUDO</h2>
                </Typography>
                <div className={classes.grow} />
              {location.pathname === '/' && (
                <div className={classes.button}>
                    <IconButton component={Link} to='/cart' aria-label='Show cart items' color='inherit'>
                        <Badge badgeContent={totalItems} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </div>
              )}
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default Navbar;
