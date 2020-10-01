import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE, LOGOUT_BEGIN
} from "redux/actions/constants";

const initialState = {
  isLoggedIn: false,
  user: null,
  pending: false,
  error: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_BEGIN:
    case LOGOUT_BEGIN:
      return {
        ...state,
        user: null,
        pending: true,
        isLoggedIn: false,
        error: "",
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        pending: false,
        isLoggedIn: true,
        error: "",
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        pending: false,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default loginReducer;