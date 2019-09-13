import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form"; // form icin kullandıgımız spesific reducer
import templateReducer from "./templateReducer";
import mailReducer from "./mailReducer";
export default combineReducers({
  form: formReducer, // redux-form icin kullandıgımız state
  templates: templateReducer,
  mail: mailReducer
});
