import axios from 'axios'
import { LOGIN_ERRORS, SET_TOKEN } from '../types/Usertypes'
import { BASE_URL, config } from '../../config/Baseurl';

export const postLogin = (state) => {
    return async (dispatch) => {
        dispatch({ type: 'SET_LODER' });
        try {
            const { data } = await axios.post(`${BASE_URL}/login`, state, config);
            console.log(data);
            dispatch({ type: 'CLOSE_LODER' });
            const token = data.token;
            localStorage.setItem('myToken', token);
            dispatch({ type: "SET_TOKEN", payload: token });
        } catch (error) {
            dispatch({ type: 'CLOSE_LODER' });
            console.log(error.response.data.errors);
            dispatch({ type: LOGIN_ERRORS, payload: error.response.data.errors });
        }
    };
};

export const getUserByIdData = (id) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        }
        try {
            const { data } = await axios.post(`${BASE_URL}/getuserbyid`, id, config);
            const token = data.token;
            localStorage.setItem('myToken', token);
            dispatch({ type: SET_TOKEN, payload: token });
        } catch (error) {
            console.log(error);
        }
    };
}

