import axios from 'axios'
import { 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL, 
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_DETAILS_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_FAIL,
    USER_DELETE_SUCCESS,

} from "../constants/userConstants"
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants"

export const login = ( email, password ) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.post(
            '/api/users/login',
            { email, password },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
        // data is will return the user object --> will be saved in localStorage
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}


export const logout = () => (dispatch, redirectOnLogout) => {
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
    dispatch({type: USER_DETAILS_RESET})
    dispatch({type: ORDER_LIST_MY_RESET})
    dispatch({type: USER_LIST_RESET})
    // redirectOnLogout()
}

export const redirectOnLogout = ({ history }) => {
    history.push('/login')
}

export const register = ( name, email, password ) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.post(
            '/api/users',
            { name, email, password },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })
        //  after register new user, log user in at that time

        localStorage.setItem('userInfo', JSON.stringify(data))
        // data is will return the user object --> will be saved in localStorage
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}


export const getUserDetails = (id) => async (dispatch, getState) => {
    //  we use getState to get the user's token
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        })

        const { 
            userLogin: { userInfo },
        } = getState()
        //  destructuring from getState, the userInfo that is within the userLogin
        //  should give us access to the logged in user object

        const config = {
            headers: {
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.get(
            `/api/users/${id}`,
            config
        )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}


export const updateUserProfile = (user) => async (dispatch, getState) => {
    //  we use getState to get the user's token
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
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
            '/api/users/profile',
            user,
            config
        )
            //  pass in user object b/c that's the data we want to update with

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}


export const listUsers = () => async (dispatch, getState) => {
    //  we use getState to get the user's token
    try {
        dispatch({
            type: USER_LIST_REQUEST,
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
            '/api/users',
            config
        )
            //  pass in user object b/c that's the data we want to update with

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}


export const deleteUser = (id) => async (dispatch, getState) => {
    //  we use getState to get the user's token
    try {
        dispatch({
            type: USER_DELETE_REQUEST,
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

        const { data } = await axios.delete(
            `/api/users/${id}`,
            config
        )
            //  pass in user object b/c that's the data we want to update with

        dispatch({ type: USER_DELETE_SUCCESS })

    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}