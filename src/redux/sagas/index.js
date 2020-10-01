import { takeLatest, select } from "redux-saga/effects";
import {
  DELETE_ACTIVITY_BEGIN,
  FETCH_ACTIVITIES_BEGIN,
  GET_ACTIVITY_BEGIN,
  LOGIN_BEGIN,
  SAVE_ACTIVITIES_BEGIN,
  SEARCH_ACTIVITY,
} from "redux/actions/constants";
import { firestore } from "firebase/config";
import { put } from "redux-saga/effects";
import {
  getActivityFailure,
  getActivitySuccess,
  saveActivityFailure,
  saveActivitySuccess,
} from "redux/actions/saveActivityAction";
import {
  fetchActivitiesSuccess,
  fetchActivitiesFailure,
  deleteActivityFailure,
  deleteActivitySuccess,
} from "redux/actions/listActivityAction";
import { loginFailure, loginSuccess } from "redux/actions/loginAction";

function* fetchActivity() {
  try {
    const state = yield select();
    const { login: {user: {uid}} } = state;
    const docRef = yield firestore
      .collection("activities")
      .orderBy("date", "desc")
      .where("userId", "==", uid)
      .get();
    const activities = [];
    docRef.forEach((doc) => {
      const activity = doc.data();
      activities.push({ id: doc.id, ...activity });
    });
    yield put(fetchActivitiesSuccess(activities));
  } catch (error) {
    yield put(fetchActivitiesFailure(error));
  }
}

function* saveActivity({ payload, history }) {
  try {
    const state = yield select();
    const { login: {user: {uid}} } = state;
    if (payload.id) {
      // update
      const docRef = yield firestore.collection("activities").doc(payload.id);
      yield docRef.update({
        activity: payload.activity,
        description: payload.description,
        date: payload.date,
      });
    } else {
      // create
      yield firestore.collection("activities").add({
        activity: payload.activity,
        description: payload.description,
        date: payload.date,
        userId: uid,
      });
    }
    yield put(saveActivitySuccess());
    history.push("/");
  } catch (error) {
    yield put(saveActivityFailure(error));
  }
}

function* searchActivity({ payload }) {
  try {
    const state = yield select();
    const { login: {user: {uid}} } = state;

    const { startDate, endDate, activity } = payload;
    let docRef = firestore.collection("activities");

    if (startDate) {
      docRef = docRef.where("date", ">=", startDate);
    }
    if (endDate) {
      docRef = docRef.where("date", "<=", endDate);
    }
    if (activity) {
      docRef = docRef.where("activity", "==", activity);
    }
    docRef = yield docRef.where("userId", "==", uid).get();
    const activities = [];
    docRef.forEach((doc) => {
      const activity = doc.data();
      activities.push(activity);
    });
    yield put(fetchActivitiesSuccess(activities));
  } catch (error) {
    yield put(fetchActivitiesFailure(error));
  }
}

function* deleteActivity(data) {
  try {
    const state = yield select();
    const { login: {user: {uid}} } = state;

    yield firestore.collection("activities").doc(data.payload).where("userId", "==", uid).delete();
    yield put(deleteActivitySuccess(data.payload));
  } catch (error) {
    yield put(deleteActivityFailure(error));
  }
}

function* getActivity({ payload }) {
  try {
    const docRef = yield firestore.collection("activities").doc(payload).get();
    yield put(getActivitySuccess({ ...docRef.data(), id: docRef.id }));
  } catch (error) {
    yield put(getActivityFailure(error));
  }
}

function* getLogin({ payload }) {
  try {
    const user = yield firestore.collection("users").doc(payload.uid).get();
    if (!user.exists) {
      yield firestore.collection("users").doc(payload.uid).set({
        email: payload.email,
        displayName: payload.displayName,
        phoneNumber: payload.phoneNumber,
        photoURL: payload.photoURL,
      });
    }

    yield put(loginSuccess(payload));
  } catch (error) {
    yield put(loginFailure(error));
  }
}
function* mySaga() {
  yield takeLatest(FETCH_ACTIVITIES_BEGIN, fetchActivity);
  yield takeLatest(SAVE_ACTIVITIES_BEGIN, saveActivity);
  yield takeLatest(SEARCH_ACTIVITY, searchActivity);
  yield takeLatest(DELETE_ACTIVITY_BEGIN, deleteActivity);
  yield takeLatest(GET_ACTIVITY_BEGIN, getActivity);
  yield takeLatest(LOGIN_BEGIN, getLogin);
}

export default mySaga;
