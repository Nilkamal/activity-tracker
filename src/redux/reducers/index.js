import { combineReducers } from "redux";
import saveActivity from "redux/reducers/saveActivityReducer";
import listActivity from "redux/reducers/listActivityReducer";
import login from "redux/reducers/loginReducer";

export default combineReducers({
  saveActivity,
  listActivity,
  login,
});
