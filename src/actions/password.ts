import axios from "axios";
import {getPass} from "../reducers/userPasswordsReducer";
import {Action, Dispatch} from "redux";
import {API_URL} from "../config";

export const add = async (name: string, password: string, id: string) => {
    try {
        const response = await axios.post(`${API_URL}/add`, {
            name,
            password,
            id,
        });
    } catch (e) {
        console.log(e.response.data.message);
    }
};

export const getPasswords = (id: string) => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const response = await axios
                .get(`${API_URL}/`,{
                    params: {
                      userId: id,
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
            dispatch(getPass(response.data))
        } catch (e) {
            console.log(e.response.data.message);
        }
    }
};

export const deletePasswords = async (id: string) => {
    try {
        const response = await axios
            .delete(`${API_URL}/delete`,{
                params: id,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
        console.log(response.data.message)
    } catch (e) {
        console.log(e.response.data.message);
    }
};

export const editPassword = async (id: string, name: string, password: string) => {
    try {
        const response = await axios
            .post(`${API_URL}/edit`,{
                id,
                name,
                password
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },

            })
        console.log(response.data.message)
    } catch (e) {
        console.log(e.response.data.message);
    }
};
