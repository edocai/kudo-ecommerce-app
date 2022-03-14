import React, { useState, useEffect } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import { Link } from 'react-router-dom';


const steps = [
    'Shipping Address',
    'Payment Details'
];

const Checkout = ({ cart, order, onCaptureCheckout, error, refreshCart }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken]= useState(null);
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const classes = useStyles();
    
    useEffect(() => {
        if(cart.id) {
            const generateToken = async () => {
                try {
                    const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
                    setCheckoutToken(token);
                } catch {
                    // console.log(cart.id);
                    // console.log('errorrrrr')
                }
            };
            generateToken();
        }
    }, [cart]);

    const nextStep = () => setActiveStep((previousActiveStep) => previousActiveStep + 1)
    const backStep = () => setActiveStep((previousActiveStep) => previousActiveStep - 1)

    
    const next = (data) => {
        setShippingData(data);

        nextStep();
    }

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true);
        }, 3000);
    }

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant='h5'>Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider} />
                <Typography variant='subtitle2'>Order ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} to='/' variant='outlined' type='button' >Back to Home</Button>
        </>
    ) : 
    // isFinished ? (
    //     <>
    //         <div>
    //             <Typography variant='h5'>Thank you for your purchase!</Typography>
    //             <Divider className={classes.divider} />
    //         </div>
    //         <br />
    //         <Button component={Link} to='/' variant='outlined' type='button' >Back to Home</Button>
    //     </>
    // ) : 
    (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    )

    if(error) {
        <>
            <Typography varient='h5'>Error: {error}</Typography>
            <br />
            <Button component={Link} to='/' variant='outlined' type='button' >Back to Home</Button>
        </>
    }

    const Form = () => activeStep === 0 
    ? <AddressForm checkoutToken={checkoutToken} next={next}/>
    : <PaymentForm 
    shippingData={shippingData} 
    checkoutToken={checkoutToken} 
    nextStep={nextStep}
    backStep={backStep} 
    onCaptureCheckout={onCaptureCheckout}
    refreshCart={refreshCart}
    timeout={timeout}
    />

    return (
    <>
    <CssBaseline />
      <div><hr /><hr /></div>
      <main className={classes.layout}>
          <Paper className={classes.paper}>
              <Typography variant='h4' align='center'>Checkout</Typography>
              <Stepper activeStep={activeStep} className={classes.stepper}>
                  {steps.map((step) => (
                      <Step key={step}>
                          <StepLabel>{step}</StepLabel>
                      </Step>
                  ))}
              </Stepper>
              {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
          </Paper>
      </main>
    </>
  )
}

export default Checkout
