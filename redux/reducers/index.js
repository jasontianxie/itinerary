import { combineReducers } from 'redux';
import {mainPageState} from './mainPageState.js';
import {login} from './login.js';


export default combineReducers({
    mainPageState,
    login,
})