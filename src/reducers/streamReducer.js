import {
  GET_ALL_STREAMS,
  GET_STREAM,
  POST_STREAM,
  PATCH_STREAM,
  DELETE_STREAM,
  CLEAR_STREAM
} from "../actions/types";
import _ from "lodash";

export default (state = [], action) => {
  switch (action.type) {
    case GET_ALL_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case GET_STREAM:
      return { [action.payload.id]: action.payload };
    case POST_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case PATCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    case CLEAR_STREAM:
      return [];
    default:
      return state;
  }
};
