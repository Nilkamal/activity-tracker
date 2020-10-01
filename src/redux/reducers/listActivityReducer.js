import {
  FETCH_ACTIVITIES_SUCCESS,
  FETCH_ACTIVITIES_FAILURE,
  FETCH_ACTIVITIES_BEGIN,
  SEARCH_ACTIVITY,
  DELETE_ACTIVITY_BEGIN,
  DELETE_ACTIVITY_SUCCESS,
  DELETE_ACTIVITY_FAILURE,
} from "redux/actions/constants";

const initialState = {
  activities: [],
  error: "",
  loading: false,
  pending: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_ACTIVITY:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ACTIVITIES_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ACTIVITIES_SUCCESS:
      return {
        ...state,
        activities: action.payload,
        error: "",
        loading: false,
      };

    case FETCH_ACTIVITIES_FAILURE:
      return {
        ...state,
        activities: [],
        error: action.payload,
        loading: false,
      };

    case DELETE_ACTIVITY_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
        pending: true,
      };

    case DELETE_ACTIVITY_SUCCESS:
      const activities = state.activities.filter((activity) => {
        return activity.id !== action.payload;
      });
      return {
        ...state,
        loading: false,
        error: "",
        activities,
        pending: false,
      };

    case DELETE_ACTIVITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        pending: false,
      };
    default:
      return state;
  }
}
