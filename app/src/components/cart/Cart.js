import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Container, Button, Box } from "@material-ui/core";
import { Link } from "react-router-dom";

import CartItem from "./cartItem/CartItem";
import useStyles from "./styles";

const Cart = ({
  cartItems,
  addToCart,
  removeFromCart,
  deleteItem,
  summary,
  setSummary,
}) => {
  const classes = useStyles();

  const getSummary = () => {
    const arr = [];
    if (cartItems.length === 0) {
      setSummary(0);
    } else {
      cartItems.map((item) => {
        arr.push(item.price * item.qty);
        setSummary(arr.reduce((a, b) => a + b).toFixed(2));
      });
    }
  };

  useEffect(() => {
    console.log(cartItems);
    getSummary();
  }, [cartItems]);

  const EmptyCart = () => (
    <>
      <div className={classes.center}>
        <Typography
          variant="subtitle2"
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "20px",
          }}
        >
          Koszyk jest pusty, przejdź do sklepu, aby &nbsp;
          <Link to="/">dodać przedmioty do koszyka</Link>
        </Typography>
      </div>
    </>
  );

  const FilledCart = () => (
    <Container className={classes.center}>
      <main style={{ marginBottom: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Koszyk
        </Typography>
        <Grid container justify="center" spacing={4}>
          {cartItems.map((item) => {
            return (
              <CartItem
                key={item.id}
                cartItem={item}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                deleteItem={deleteItem}
              />
            );
          })}
        </Grid>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            margin: "50px 0",
            marginRight: "10px",
          }}
        >
          <Typography variant="h6" style={{ marginRight: "10px" }}>
            Do zapłacenia: {summary} PLN
          </Typography>
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            color="primary"
          >
            Przejdź do płatności
          </Button>
        </Box>
      </main>
    </Container>
  );

  return (
    <>
      <div className={classes.margin} />
      {cartItems.length === 0 ? <EmptyCart /> : <FilledCart />}
    </>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.array,
  addToCart: PropTypes.func,
  removeFromCart: PropTypes.func,
  deleteItem: PropTypes.func,
  summary: PropTypes.any,
  setSummary: PropTypes.func,
};

export default Cart;
