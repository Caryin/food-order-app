import React from 'react';

import classes from '../Meal/MealsAppInfo.module.css';

const MealsAppInfo = () => {
  return (
    <section className={classes.info}>
      <h2>Delicious Food, Delivered To You</h2>
      <p>
        Choose your favourite meal from our broad selection of available meals
        and enjoy a deliecious lunch or dinner at home.
      </p>
      <p>
        All our meals are coked with hihg-quality ingredients, just-in-time and
        of course by our experienced chefs!
      </p>
    </section>
  );
};

export default MealsAppInfo;
