import axios from 'axios';
import { setAlert } from './alert';
import {
  DELETE_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types';

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(
      '/api/post'
    ); /*WAIT KRRO JB TK ME BACKEND SE KAAM PURA KR K NA AAJAU */
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// LIKE A POST
export const addLike = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/like/${postid}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postid, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// UNLIKE A POST
export const removeLike = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/unlike/${postid}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postid, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// DELETE A POST
export const deletepost = (postid) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/${postid}`);
    dispatch({
      type: DELETE_POST,
      payload: postid,
    });

    dispatch(setAlert('POST REMOVED', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// ADD A POST
export const addpost = (formdata) => async (dispatch) => {
 
  try {
 
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
 
    const res = await axios.post(`/api/post`, formdata, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert('POST CREATED', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get post
export const getPost = (postid) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/post/${postid}`
    ); /*WAIT KRRO JB TK ME BACKEND SE KAAM PURA KR K NA AAJAU */
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// ADD A COMMENT
export const addComment = ( postid,formdata) => async (dispatch) => {
 
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(
      `/api/post/comment/${postid}`,
      formdata,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert('COMMENT CREATED', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// DELETE A COMMENT
export const deleteComment = ( postid,commentid) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/comment/${postid}/${commentid}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentid,
    });

    dispatch(setAlert('COMMENT REMOVED', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
