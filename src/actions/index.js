import {
  SIGN_IN,
  SIGN_OUT,
  GET_USER,
  CLEAR_USER,
  GET_ALL_STREAMS,
  GET_STREAM,
  POST_STREAM,
  PATCH_STREAM,
  DELETE_STREAM,
  CLEAR_STREAM
} from "./types";
import streams from "../apis/streams";
import history from "../history";

export const signIn = () => {
  return {
    type: SIGN_IN
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const getUser = (currentUser) => {
  return {
    type: GET_USER,
    payload: currentUser
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER
  };
};

export const getAllStreams = () => async (dispatch) => {
  const response = await streams.get("/streams");

  dispatch({
    type: GET_ALL_STREAMS,
    payload: response.data
  });
};

export const getStream = (streamId) => async (dispatch) => {
  const response = await streams.get(`/streams/${streamId}`);

  dispatch({
    type: GET_STREAM,
    payload: response.data
  });
};

export const postStream = (formValues) => async (dispatch, getState) => {
  const { userName } = getState().user;
  const response = await streams.post("/streams", { ...formValues, userName });

  dispatch({
    type: POST_STREAM,
    payload: response.data
  });

  history.push("/streams/mystream");
};

export const patchStream = (streamId, formValues) => async (dispatch) => {
  const response = await streams.patch(`/streams/${streamId}`, formValues);

  dispatch({
    type: PATCH_STREAM,
    payload: response.data
  });

  history.push("/streams/mystream");
};

export const deleteStream = (streamId) => async (dispatch) => {
  await streams.delete(`/streams/${streamId}`);

  dispatch({
    type: DELETE_STREAM,
    payload: streamId
  });

  history.push("/streams/mystream");
};

export const clearStream = () => {
  return {
    type: CLEAR_STREAM
  };
};
