const initialState = {
    dishes: [] //pratos escolhidos
};

export default (state = initialState, action) => {
    switch(action.type){
        case 'SET_DISHES':
            return {
                ...state, 
                dishes: action.payload.dishes
            }
        break;
    }
    return state;
}