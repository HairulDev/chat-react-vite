import {
  CREATE,
  UPDATE,
  FETCH_MESSAGE_BY,
  FETCH_MESSAGE,
  FETCH_ALL,
  AUTH,
  FETCH_USER,
  CLEAR_MESSAGE,
  FETCH_GROUP,
} from "../../constants/actionTypes";

import axios from "axios";

const API = axios.create({ baseURL: `http://localhost:3001` });
// API.interceptors.request.use((req) => {
//   req.headers['x-access-token'] = `${JSON.parse(localStorage.getItem("profile")).access_token}`;
//   return req;
// });

export const clearMessage =
  () => async (dispatch) => {
    try {
      dispatch({ type: CLEAR_MESSAGE });
    } catch (error) {
      console.log("error signin", error);
    }
  };

export const signin =
  (data) => async (dispatch) => {
    try {
      dispatch({ type: AUTH, payload: data });
    } catch (error) {
      console.log("error signin", error);
      return error
    };
  };

export const fetchUser =
  (id) => async (dispatch) => {
    try {
      const { data } = await API.get(`/users/${id}`);
      dispatch({
        type: FETCH_USER,
        payload: data,
      });
      return data
    } catch (error) {
      return error
    };
  };

export const fetchUsers =
  () => async (dispatch) => {
    try {
      const { data } = await API.get(`/users`);
      dispatch({
        type: FETCH_ALL,
        payload: data,
      });
      return data
    } catch (error) {
      return error
    };
  };

export const fetchMessage =
  (id) => async (dispatch) => {
    try {
      const { data } = await API.get(`/messages/${id}`);
      dispatch({
        type: FETCH_MESSAGE_BY,
        payload: data,
      });
      return data
    } catch (error) {
      return error
    };
  };

export const fetchMessages =
  () => async (dispatch) => {
    try {
      const { data } = await API.get(`/messages`);
      dispatch({
        type: FETCH_MESSAGE,
        payload: data,
      });
      return data
    } catch (error) {
      return error
    };
  };

export const createMessage =
  (body) => async (dispatch) => {
    try {
      const { data } = await API.post(`/messages`, body);
      dispatch({
        type: CREATE,
        payload: data,
      });
      return data
    } catch (error) {
      return error
    };
  };

export const updateMessage =
  (id, body) => async (dispatch) => {
    try {
      const { data } = await API.put(`/messages/${id}`, body)
      dispatch({
        type: UPDATE,
        payload: data,
      });
      return data
    } catch (error) {
      return error
    };
  };

export const delMessage =
  (id) => async (dispatch) => {
    try {
      const { data } = await API.delete(`/messages/${id}`)
      return data
    } catch (error) {
      return error
    };
  };

export const fetchGroups =
  () => async (dispatch) => {
    try {
      const { data } = await API.get(`/groups`)
      dispatch({
        type: FETCH_GROUP,
        payload: data,
      });
      return data
    } catch (error) {
      return error
    };
  };