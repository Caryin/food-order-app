import React, { useContext } from 'react';

import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import Checkout from './Checkout';
import { useState } from 'react/cjs/react.development';

const Cart = (props) => {
  const [checkout, setCheckout] = useState(false);
  const [ordersSubmitting, setOrdersSubmitting] = useState(false);
  const [ordersConfirmed, setOrdersConfirmed] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const checkoutHandler = () => {
    setCheckout(true);
  };

  const confirmOrderHandler = async (userData) => {
    setOrdersSubmitting(true);
    await fetch(
      'https://react-http-c46bc-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setOrdersSubmitting(false);
    setOrdersConfirmed(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderButton = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onHideCart}>
        Close
      </button>
      {hasItem && (
        <button className={classes.button} onClick={checkoutHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkout && (
        <Checkout onConfirm={confirmOrderHandler} onCancel={props.onHideCart} />
      )}
      {!checkout && orderButton}
    </>
  );

  const ordersSubmittingModalContent = (
    <p className={classes.orders}>Making your order...</p>
  );

  const ordersConfirmedModalContent = (
    <>
      <p className={classes.orders}>Your order is confirmed!</p>
      <div className={classes.actions}>
        <center>
          <button className={classes.button} onClick={props.onHideCart}>
            Close
          </button>
        </center>
      </div>
    </>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!ordersSubmitting && !ordersConfirmed && cartModalContent}
      {ordersSubmitting && ordersSubmittingModalContent}
      {!ordersSubmitting && ordersConfirmed && ordersConfirmedModalContent}
    </Modal>
  );
};

export default Cart;
