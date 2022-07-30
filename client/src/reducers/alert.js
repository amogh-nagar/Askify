// It takes a piece of state and that conmtains alert objects, but initially it will be an empty array
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initialState = [];

/* Inside this{id: 1,msg: 'Please login', alertType:"Success"}, */

export default function (state = initialState, action) {
  const { type, payload } = action; /*Destructured it */
  switch (type /*For type */) {
    case SET_ALERT:
      return [
        ...state,
        payload,
      ]; /*
      Added to array alertType, payload is bopdy, and as state is mutable, so if there is already an aleryt in there4 , we have to copy and add new alert and payload will have .message, .id etc*/

    case REMOVE_ALERT:
      return state.filter(
        (alert) =>
          alert.id !==
          payload /*In this i have to remove an alert by it's id so if alert.id !== paytload(payload can be anything) and in this case it's id */
      );
    default:
      return state;
  }
}
