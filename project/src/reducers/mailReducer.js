import { USE_TEMPLATE } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case USE_TEMPLATE:
      return { ...state, mail: action.payload };
    default:
      return state;
  }
};
