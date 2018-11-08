import axios from 'axios';
import {config} from '../../src/common/ajaxConfig.js'


export function getSearchData(index,value) {
    return function (dispatch, getState) {
        // console.log(getState())
        dispatch({
            type: 'MAIN_PAGE_GET_SEARCH_START',
            index,
            payload: ''
        });
        axios.get(config.mainDomain + '/mainPageSpotsData.json?search=' + value).then((response) => {
                dispatch({
                    type: 'MAIN_PAGE_GET_SEARCH_SUCCESS',
                    index,
                    payload: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
                dispatch({
                    type: 'MAIN_PAGE_GET_SEARCH_FAIL',
                    index,
                    payload: error
                })
            });

    }
}