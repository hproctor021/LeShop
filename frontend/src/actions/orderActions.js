import axios from 'axios'

import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL
 } from '../constants/orderConstants'

 export const createOrder = (order) => async (dispatch, getState) => {
    //  we use getState to get the user's token
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
        })

        const { 
            userLogin: { userInfo },
        } = getState()
        //  destructuring from getState, the userInfo that is within the userLogin
        //  should give us access to the logged in user object

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.post(
            '/api/orders',
            order,
            config
        )
            //  pass in user object b/c that's the data we want to update with

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}