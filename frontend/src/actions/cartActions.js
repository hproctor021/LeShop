import axios from 'axios'
import { CART_ADD_ITEM } from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } =await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.cointInStock,
            qty
            // we include what info we want to show in the cart
        }
    })

localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
// we call JSON.stringify because we can only store strings in localStorage

}