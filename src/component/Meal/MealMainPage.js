import React from 'react';

import MealsAppInfo from './MealsAppInfo';
import AvailableMeals from './AvailableMeals';

const MealMainPage = (props) => {
  return (
    <>
      <MealsAppInfo />
      <AvailableMeals />
    </>
  );
};

export default MealMainPage;
