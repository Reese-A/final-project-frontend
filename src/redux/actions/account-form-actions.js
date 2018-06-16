export const SAVE_ACCOUNT_FORM = 'SAVE_ACCOUNT_FORM';

export const saveAccountForm = (accountForm) => {
  return dispatch => {
    return dispatch({
      type: SAVE_ACCOUNT_FORM,
      accountForm
    });
  };
};
