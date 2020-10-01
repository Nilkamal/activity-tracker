import { SAVE_ACTIVITIES_BEGIN, SAVE_ACTIVITIES_SUCCESS, SAVE_ACTIVITIES_FAILURE, GET_ACTIVITY_BEGIN, GET_ACTIVITY_SUCCESS, GET_ACTIVITY_FAILURE } from 'redux/actions/constants'

export const saveActivityBegin = (data, history) => ({
    type: SAVE_ACTIVITIES_BEGIN,
    payload: data,
    history,
})

export const saveActivitySuccess = () => ({
    type: SAVE_ACTIVITIES_SUCCESS, 
})

export const saveActivityFailure = (error) => ({
    type: SAVE_ACTIVITIES_FAILURE, 
    payload: error
})

export const getActivityBegin = (id) => ({
    type: GET_ACTIVITY_BEGIN,
    payload: id
});

export const getActivitySuccess = activity => ({
    type: GET_ACTIVITY_SUCCESS,
    payload: activity
})

export const getActivityFailure = error => ({
    type: GET_ACTIVITY_FAILURE,
    payload: error
})