let initState = [];

export const getCountryCityDistrict = (state=initState,action)=>{
    switch (action.type){
        case 'GET_COUNTRY_CITY_DISTRICT_START':
        console.log('getCountryCityDistrict startting');
        return state;
        case 'GET_COUNTRY_CITY_DISTRICT_SUCCESS':
        console.log('getCountryCityDistrict success');
        return {...state,data:action.payload,status:"success"}
        case 'GET_COUNTRY_CITY_DISTRICT_FAIL':
        console.log('getCountryCityDistrict fail');
        return state;
        default:
        return state;
    }
}