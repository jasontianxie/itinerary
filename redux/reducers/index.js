import { combineReducers } from 'redux';
import {mainPageState} from './mainPageState.js';
import {login} from './login.js';
import {getCountryCityDistrict} from './getCountryCityDistrict.js';


export default combineReducers({
    mainPageState,
    login,
    countryCityDistricts: getCountryCityDistrict,
})