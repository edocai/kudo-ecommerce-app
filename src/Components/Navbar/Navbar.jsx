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
                <Typography component={Link} to='/' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', 
                fontSize: '1.8rem', fontWeight: '520', padding: '15px'}} 
                 className={classes.title} color='inherit'>
                    <img src={logo} style={{paddingRight: '10px'}} alt='E-Commerce' height='28px' className={classes.img} />
                    KUDO
                </Typography>
              {location.pathname === '/' && (
                <div className={classes.button} >
                    <IconButton component={Link} to='/cart' aria-label='Show cart items' color='inherit' style={{ marginLeft: "auto" }} >
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
