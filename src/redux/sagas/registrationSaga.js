import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' }); //to errorsReducer

    // passes the username and password from the payload to the server
    yield axios.post('api/user/register', action.payload);

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload }); //to loginSaga
    
    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({type: 'SET_TO_LOGIN_MODE'}); //to loginModeReducer
  } catch (error) {
      console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' }); //to errorsReducer
  }
}// end registerUser function

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser); //from RegisterPage
}

export default registrationSaga;
