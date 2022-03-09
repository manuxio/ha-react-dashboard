// import fetch from 'fetch';
import { Dispatch } from "redux";
import { ActionType, Action } from "../actionTypes";

export const getComments = (postId: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.GET_POST_COMMENTS_PENDING,
    });

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      const data = await response.json();
      console.log(data);
      dispatch({
        type: ActionType.GET_POST_COMMENTS_SUCCESS,
        payload: data,
      });
    } catch (err: any) {
      dispatch({
        type: ActionType.GET_POST_COMMENTS_FAIL,
        payload: err.message,
      });
    }
  };
};
