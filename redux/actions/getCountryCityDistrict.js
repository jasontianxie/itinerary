import axios from 'axios';
import {
    config
} from '../../src/common/ajaxConfig.js';

export function getCountryCityDistrict(values) {
    return function (dispatch, getState) {
        dispatch({
            type: 'GET_COUNTRY_CITY_DISTRICT_START',
            payload: ''
        });
        axios.get(config.mainDomain + '/public/country-province-city-district/' + values + ".json",{url: config.mainDomain + '/public/country-province-city-district',headers: {"Access-Control-Allow-Origin": "*"}}).then((response) => {
                dispatch({
                    type: 'GET_COUNTRY_CITY_DISTRICT_SUCCESS',
                    payload: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
                dispatch({
                    type: 'GET_COUNTRY_CITY_DISTRICT_FAIL',
                    payload: error
                })
            });

    }
}