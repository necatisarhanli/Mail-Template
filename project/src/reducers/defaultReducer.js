import { DEFAULT_TEMPLATES } from "../actions/types";
const INITIAL_STATE = {
  isDefault: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DEFAULT_TEMPLATES:
      return { ...state, isDefault: action.payload };
    default:
      return state;
  }
};
