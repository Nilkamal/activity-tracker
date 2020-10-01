import {
  GET_ACTIVITY_BEGIN,
  GET_ACTIVITY_FAILURE,
  GET_ACTIVITY_SUCCESS,
  SAVE_ACTIVITIES_BEGIN,
  SAVE_ACTIVITIES_FAILURE,
  SAVE_ACTIVITIES_SUCCESS,
} from "redux/actions/constants";

const initialState = {
  error: "",
  pending: false,
  activity: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SAVE_ACTIVITIES_BEGIN:
    case GET_ACTIVITY_BEGIN:
      return {
        ...state,
        error: "",
        pending: true,
        activity: [],
      };
    case SAVE_ACTIVITIES_FAILURE:
    case GET_ACTIVITY_FAILURE:
      return {
        ...state,
        error: action.payload,
        pending: false,
      };
    case SAVE_ACTIVITIES_SUCCESS:
      return {
        ...state,
        error: "",
        pending: false,
        activity: [],
      };
    case GET_ACTIVITY_SUCCESS:
      return {
        ...state,
        error: "",
        pending: false,
        activity: action.payload,
      };

    default:
      return state;
  }
}
