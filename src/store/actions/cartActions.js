import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

export const addToCart = product => (dispatch, getState) => {
    const cartItems = getState().cart.cartItems.slice();
    let alreadyExist = false;
    cartItems.forEach(item => {
        if (item._id === product._id) {
            alreadyExist = true;
            item.count++;
        }
    });
    if (!alreadyExist) {
        cartItems.push({...product, count: 1});
    };

    dispatch({
        type: ADD_TO_CART,
        payload: { cartItems }
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = product => (dispatch, getState) => {
    const updatedCartItems = getState().cart.cartItems.slice();
    let cartItems;
    if (product.count === 1) {
        cartItems = updatedCartItems.filter(item => item._id !== product._id);
    } else {
        cartItems = updatedCartItems.map(item => {
            if (item._id === product._id) {
                item.count = item.count - 1;
                return {
                    ...item,
                    ...item.count
                }
            } else {
                return item;
            }
        });
    };
    // const cartItems = getState().cart.cartItems.slice().filter(item => item._id !== product._id);
    
    dispatch({
        type: REMOVE_FROM_CART,
        payload: { cartItems }
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};