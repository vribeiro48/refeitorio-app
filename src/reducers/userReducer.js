const initialState = {
    dishes: [], //pratos escolhidos
    menu: '',
};

export default (state = initialState, action) => {
    switch(action.type){
        case 'SET_DISHES':
            return {
                ...state, 
                dishes: action.payload.dishes
            }
        break;
        case 'SET_MENU':
            return{
                ...state,
                menu: action.payload.menu
            }
        break;
    }
    return state;
}