import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import userReducer from "./userReducer";
import streamReducer from "./streamReducer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  streams: streamReducer,
  form: formReducer
});
