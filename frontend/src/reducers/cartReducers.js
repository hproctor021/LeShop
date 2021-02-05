import { CART_ADD_ITEM } from '../constants/cartConstants'

// cartItems is an array because you can have multiple items in a cart
export const cartReducer = (state = { cartItems: []}, action ) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload

            const existItem = state.cartItems.find(x => x.product === item.product)

            if( existItem ){
                return {
                    ...state,
                    cartItems: state.cartItems.map(
                        x => x.product === existItem.product 
                        ? item 
                        : x 
                    )
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        default:
            return state
    }
}