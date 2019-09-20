import _ from "lodash";

import {
  CREATE_TEMPLATE,
  FETCH_SINGLE_TEMPLATE,
  FETCH_ALL_TEMPLATES,
  DELETE_TEMPLATE,
  EDIT_TEMPLATE
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_TEMPLATE:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_ALL_TEMPLATES:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case DELETE_TEMPLATE:
      return _.omit(state, action.payload);
    case FETCH_SINGLE_TEMPLATE:
      return { ...state, [action.payload._id]: action.payload };
    case EDIT_TEMPLATE:
      return { ...state, [action.payload._id]: action.payload };
    default:
      return state;
  }
};
