import axios from 'axios'

import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL
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


export const getOrderDetails = (id) => async (dispatch, getState) => {
    //  we use getState to get the user's token
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        })

        const { 
            userLogin: { userInfo },
        } = getState()
        //  destructuring from getState, the userInfo that is within the userLogin
        //  should give us access to the logged in user object

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.get(
            `/api/orders/${id}`,
            config
        )
            //  pass in user object b/c that's the data we want to update with

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}


export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    //  we use getState to get the user's token
    try {
        dispatch({
            type: ORDER_PAY_REQUEST,
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

        const { data } = await axios.put(
            `/api/orders/${orderId}/pay`,
            paymentResult,
            config
        )
            //  pass in user object b/c that's the data we want to update with

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}