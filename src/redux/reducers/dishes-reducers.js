import {
  LOAD_USER_DISHES,
  SET_DISH_NAME,
  SET_DISH_FOOD_SERVINGS,
  ADD_DISH_FOOD,
  REMOVE_DISH_FOOD,
  CLEAR_DISH,
  CREATE_DISH
} from '../actions/dishes-actions';

const initialState = {};

export const dishes = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_DISHES:
      const dishes = action.dishes.reduce((dishes, dish) => {
        dishes[dish.id] = dish;
        return dishes;
      }, {});
      return dishes;
    // return action.dishes;
    default:
      return state;
  }
};

const initialDish = { name: '', calories: 0, foods: {} };

export const newDish = (state = initialDish, action) => {
  switch (action.type) {
    case CREATE_DISH: {
      return { name: '', calories: 0, foods: Object.create(null) };
    }
    case SET_DISH_NAME: {
      const newDish = { ...state };
      newDish.name = action.name;
      return newDish;
    }
    case SET_DISH_FOOD_SERVINGS: {
      console.log('in 1');

      if (!state.foods[action.id]) return state;

      console.log('in 2');

      const { servings, id } = action;
      const newDish = { ...state };

      newDish.foods[id].servings = servings;

      const calories = Object.values(newDish.foods).reduce((sum, curr) => {
        return sum + curr.food.calories * curr.servings;
      }, 0);

      newDish.calories = calories;

      return newDish;
    }
    case ADD_DISH_FOOD: {
      const { servings, food } = action;
      const newDish = { ...state };
      newDish.foods[food.id] = { servings, food };

      const calories = Object.values(newDish.foods).reduce((sum, curr) => {
        return sum + curr.food.calories * curr.servings;
      }, 0);

      newDish.calories = calories;
      return newDish;
    }
    case REMOVE_DISH_FOOD: {
      const { id } = action;

      const newDish = { ...state };
      delete newDish.foods[id];

      const calories = Object.values(newDish.foods).reduce((sum, curr) => {
        return sum + curr.food.calories * curr.servings;
      }, 0);

      newDish.calories = calories;

      return newDish;
    }
    case CLEAR_DISH: {
      return { name: '', calories: 0, foods: Object.create(null) };
    }
    default:
      return state;
  }
};

export default dishes;
