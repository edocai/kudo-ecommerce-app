import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './styles';

const Product = ({ product, onAddToCart }) => {
    const classes = useStyles();  
  return (
    <Card className={classes.root}>
        <CardMedia style={{margin: '15px'}} className={classes.media} image={product.image.url} title={product.name} />
        <CardContent>
            <div className={classes.cardContent}>
                <Typography variant='h6' gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant="h6">
                    {product.price.formatted_with_symbol}
                </Typography>
            </div>
            <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color='textSecondary'>
            </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
            <IconButton style={{ marginLeft: "auto" }} aria-label='Add to Cart' onClick={() => onAddToCart(product.id, 1)} >
                <AddShoppingCart />
            </IconButton>
        </CardActions>
    </Card>
  )
}

export default Product
