export const LOAD_USER_DISHES = 'LOAD_USER_DISHES';
export const LOAD_CONSUMPTION = 'LOAD_CONSUMPTION';

export const loadUserDishes = () => {
  return dispatch => {
    return fetch('/api/users/dishes', { credentials: 'same-origin' })
      .then(res => res.json())
      .then(dishes => {
        dispatch({ type: LOAD_USER_DISHES, dishes });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const loadConsumption = dishes => {
  return dispatch => {
    return fetch('/api/users/dishes', { credentials: 'same-origin' })
      .then(res => res.json())
      .then(dishes => {
        const calArr = [];
        const carbArr = [];
        const fatArr = [];
        const proArr = [];
        dishes.forEach(dish => {
          dish.ingredients.forEach(food => {
            calArr.push(food.calories * food._pivot_servings);
            carbArr.push(food.carb * food._pivot_servings);
            fatArr.push(food.fat * food._pivot_servings);
            proArr.push(food.protein * food._pivot_servings);
          });
        });
        const totals = {};
        totals.calories = calArr.reduce((curr, next) => curr + next, 0);
        totals.carb = carbArr.reduce((curr, next) => curr + next, 0);
        totals.fat = fatArr.reduce((curr, next) => curr + next, 0);
        totals.protein = proArr.reduce((curr, next) => curr + next, 0);
        dispatch({ type: LOAD_CONSUMPTION, totals });
      });
  };
};
