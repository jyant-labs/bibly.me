export const initialState = {
    userPage:{
        'pageTitle':"",
        'pageDescription':"",
        'keywords':'',
        'cardColor':'white',
        'textColor':'black',
        'background':'#505050',
        'cards':{},
        'layout': {
          id: 'layout',
          cardsOrder: [],
        }
    },
    isDrawerOpen:false,
    userInfo:{}
};

export const actionTypes = {
    SET_USERPAGE: "SET_USERPAGE",
    SET_ISDRAWEROPEN:"SET_ISDRAWEROPEN",
    SET_USERINFO:"SET_USERINFO"

};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USERPAGE:
            return {
                ...state,
                userPage: action.userPage,
            };
            
        case actionTypes.SET_ISDRAWEROPEN:
            return {
                ...state,
                isDrawerOpen: action.isDrawerOpen,
            };

        case actionTypes.SET_USERINFO:
            return {
                ...state,
                userInfo: action.userInfo,
            };      

        default:
            return state;
    }
};

export default reducer;