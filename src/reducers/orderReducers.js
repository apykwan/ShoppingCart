import {
    CREATE_ORDER,
    CLEAR_ORDER,
    FETCH_ORDER
} from "../types";

export const orderReducer = (state = {}, action) => {
    switch(action.type) {
        case CREATE_ORDER: 
            return { order: action.payload };
        case CLEAR_ORDER: 
            return { order: null };
        case FETCH_ORDER: 
            return { orders: action.payload };
        default:
            return state;
    };
};