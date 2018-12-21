import axios from 'axios';
import {config} from '../../src/common/ajaxConfig.js'


export function login(values) {
    return function (dispatch, getState) {
        dispatch({
            type: 'LOGIN_START',
            payload: ''
        });
        axios.post(config.mainDomain + '/users', values).then((response) => {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
                dispatch({
                    type: 'LOGIN_FAIL',
                    payload: error
                })
            });

    }
}