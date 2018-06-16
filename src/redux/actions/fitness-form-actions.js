export const SAVE_FITNESS_FORM = 'SAVE_FITNESS_FORM';

export const saveFitnessForm = (fitnessForm) => {
  return dispatch => {
    return dispatch({
      type: SAVE_FITNESS_FORM,
      fitnessForm
    });
  };
};

