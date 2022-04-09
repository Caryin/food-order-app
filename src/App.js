import React, { useState } from 'react';

import CartProvider from './store/CartProvider';
import Cart from './component/Cart/Cart';
import Header from './component/Layout/Header';
import MealMainPage from './component/Meal/MealMainPage';

function App() {
  const [cartShown, setCartShown] = useState(false);

  const showCartHandler = () => {
    setCartShown(true);
  };

  const hideCartHandler = () => {
    setCartShown(false);
  };

  const addToCartHandler = (event) => {
    setAddToCart(event.target.value);
  };

  return (
    <CartProvider>
      {cartShown && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <MealMainPage onAdd={addToCartHandler} />
      </main>
    </CartProvider>
  );
}

export default App;
