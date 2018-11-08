let initState = {
    dataSource1: [],
    dataSource2: [],
  }

export const mainPageState = (state=initState,action)=>{
    switch (action.type){
        case 'MAIN_PAGE_GET_SEARCH_START':
        console.log('get data startting');
        return state;
        break;
        case 'MAIN_PAGE_GET_SEARCH_SUCCESS':
        if (action.index === 1){
            return {...state,dataSource1:action.payload}
        } else {
            return {...state,dataSource2:action.payload}
        }
        break;
        case 'MAIN_PAGE_GET_SEARCH_START':
        return state;
        break;
        default:
        return state;
    }
}