import axios from 'axios';
import { put, takeLatest , call} from 'redux-saga/effects';

// worker Saga: will be fired on "ADD_TO_MY_EVENTS" actions
function* addToMyEvents(action) {
    console.log('in deleteFromMyEvents, action', action);
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        // the config includes credentials which
        // allow the server session to recognize the user
        // If a user is logged in, this will return their information
        // from the server session (req.user)
        yield axios.post( '/api/myEvents/addevent', action.payload)

        yield put({ type: 'FETCH_THIS_EVENT', refresh: action.refresh.event_id });
        yield put({ type: 'FETCH_ATTENDING_THIS_EVENT', refresh: action.refresh.event_id });    
    } catch (error) {
        console.log('Delete from my events request failed', error);
    }
}//end addToMyEvents

// worker Saga: will be fired on "DELETE_FROM_MY_EVENTS" actions
function* deleteFromMyEvents(action) {
    console.log('in deleteFromMyEvents, action', action);
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        // the config includes credentials which
        // allow the server session to recognize the user
        // If a user is logged in, this will return their information
        // from the server session (req.user)
        yield axios.delete(`api/myEvents/${action.payload.event_id}/${action.payload.user_id}`, config);

        // now that the session has given us a user object
        // with an id and username set the client-side user object to let
        // the client-side code know the user is logged in
        yield put({ type: 'FETCH_MY_EVENTS', refresh: action.refresh.user_id });
        yield put({ type: 'FETCH_THIS_EVENT', refresh: action.refresh.event_id });
        yield put({ type: 'FETCH_ATTENDING_THIS_EVENT', refresh: action.refresh.event_id });    

    } catch (error) {
        console.log('Delete from my events request failed', error);
    }
}//end deleteFromMyEvents

// worker Saga: will be fired on "FETCH_MY_EVENTS" actions
function* fetchMyEvents(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        // the config includes credentials which
        // allow the server session to recognize the user
        // If a user is logged in, this will return their information
        // from the server session (req.user)
        const response = yield axios.get(`api/myEvents/myevents?id=${action.refresh}`, config);
        // const response = yield axios.get(`api/myEvents`, config);
 
        // now that the session has given us a user object
        // with an id and username set the client-side user object to let
        // the client-side code know the user is logged in
        yield put({ type: 'SET_MY_EVENTS', payload: response.data });
    } catch (error) {
        console.log('My Events get request failed', error);
    }
}
function* editEvent(action){
    try{
        yield call (axios.put , '/api/captain/edit/event' , action.payload)
        yield put({type: 'FETCH_CAPTAIN_PROFILE', payload: action.payload.captain_id})
    }catch(error){
        console.log('error in edit saga' , error);
        
    }
}


function* updateRating(action){
    try {
        console.log('action.paylod in saga', action.payload);
        yield call(axios.put, `/api/myEvents/feedback`, action.payload)
    }
    catch (error){
        console.log('error in adding rating saga' , error);
    }
}


function* myEventsSaga() {
    yield takeLatest('FETCH_MY_EVENTS', fetchMyEvents)
    yield takeLatest('DELETE_FROM_MY_EVENTS', deleteFromMyEvents)
    yield takeLatest('ADD_TO_MY_EVENTS', addToMyEvents)
    yield takeLatest('EDIT_EVENT' , editEvent)
    yield takeLatest('UPDATE_FEEDBACK', updateRating)

}

export default myEventsSaga;