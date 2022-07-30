import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';
// Dispatch more than one action
export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuidv4();
  // uuid will give us a random id(unique)
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  }); /*See reducers/alert */

  setTimeout(
    () => dispatch({ type: REMOVE_ALERT, payload: id }),
    timeout
  ); /*after 5 seconds, it will dispatchj REMOVE_ALERT with id as payload */
};
