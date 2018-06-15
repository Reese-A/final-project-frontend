export const SAVE_PROFILE_FORM = 'SAVE_PROFILE_FORM';

export const saveProfileForm = (profileForm) => {
  return dispatch => {
    return dispatch({
      type: SAVE_PROFILE_FORM,
      profileForm
    });
  };
};

