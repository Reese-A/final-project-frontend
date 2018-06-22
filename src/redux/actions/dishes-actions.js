export const LOAD_USER_DISHES = 'LOAD_USER_DISHES';
export const LOAD_CONSUMPTION = 'LOAD_CONSUMPTION';
export const SET_DISH_NAME = 'SET_DISH_NAME';
export const SET_DISH_FOOD_SERVINGS = 'SET_DISH_FOOD_SERVINGS';
export const ADD_DISH_FOOD = 'ADD_DISH_FOOD';
export const REMOVE_DISH_FOOD = 'REMOVE_DISH_FOOD';
export const CLEAR_DISH = 'CLEAR_DISH';
export const CREATE_DISH = 'CREATE_DISH';

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

export const createDish = dish => {
  return dispatch => {
    // console.log(dish);
    // return;

    const { name, calories, foods } = dish;
    return fetch('/api/dishes', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        name,
        calories,
        foods: Object.values(foods)
      })
    })
      .then(data => {
        return data.json();
      })
      .then(dish => {
        dispatch({
          type: CREATE_DISH,
          dish
        });
      });
  };
};

export const setDishName = name => {
  return {
    type: SET_DISH_NAME,
    name
  };
};

export const setDishFoodServings = (id, servings) => {
  return {
    type: SET_DISH_FOOD_SERVINGS,
    id,
    servings
  };
};

export const addDishFood = (servings, food) => {
  return {
    type: ADD_DISH_FOOD,
    servings,
    food
  };
};

export const removeDishFood = id => {
  return {
    type: REMOVE_DISH_FOOD,
    id
  };
};

export const clearDish = () => {
  console.log('clearDish');
  return {
    type: CLEAR_DISH
  };
};
