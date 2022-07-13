import axios from "axios";
import { setUser } from "../reducers/userReducer";
import {getPass} from "../reducers/userPasswordsReducer";
import {Action, Dispatch} from "redux";
import {API_URL} from "../config";

export const registration = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/registration`, {
      email,
      password,
    });
    console.log(response.data.message);
  } catch (e) {
    console.log(e.response.data.message);
  }
};

export const login = (email: string, password: string) => {
  return async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };
};

export const auth = () => {
  return async (dispatch: Dispatch<Action<any>>) => {
    try {
      const response = await axios.get(`${API_URL}/auth`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      console.log(e.response.data.message);
      localStorage.removeItem("token");
    }
  };
};
