import {FETCH_ACTIVITIES_BEGIN, FETCH_ACTIVITIES_SUCCESS, FETCH_ACTIVITIES_FAILURE, SEARCH_ACTIVITY, DELETE_ACTIVITY_BEGIN, DELETE_ACTIVITY_FAILURE, DELETE_ACTIVITY_SUCCESS} from 'redux/actions/constants';

export const fetchActivitiesBegin = () => ({
    type: FETCH_ACTIVITIES_BEGIN,
})

export const fetchActivitiesSuccess = (data) => ({
    type: FETCH_ACTIVITIES_SUCCESS,
    payload: data
});

export const fetchActivitiesFailure = (error) => ({
    type: FETCH_ACTIVITIES_FAILURE,
    payload: error
})

export const searchActivities = (search) => ({
    type: SEARCH_ACTIVITY, 
    payload: search
});

export const deleteActivityBegin = (id) => ({
    type: DELETE_ACTIVITY_BEGIN, 
    payload: id
})

export const deleteActivitySuccess = (id) => ({
    type: DELETE_ACTIVITY_SUCCESS, 
    payload: id
})

export const deleteActivityFailure = (error) => ({
    type: DELETE_ACTIVITY_FAILURE, 
    payload: error
})