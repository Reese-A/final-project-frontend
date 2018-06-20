export const CREATE_DISH = 'CREATE_DISH';

export const createDish = dish => {
  return dispatch => {
    return fetch('/api/dishes', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        name: dish.name,
        foods: JSON.stringify(dish.foods)
      })
    })
      .then(data => {
        return data.json();
      })
      .then(dish => {
        //error handle here

        dispatch({
          type: CREATE_DISH,
          dish
        });
      });
  };
};
