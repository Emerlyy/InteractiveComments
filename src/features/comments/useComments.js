import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComments, selectAllComments } from "./comments-slice";
import data from '../../data.json'

export const useComments = () => {

  const dispatch = useDispatch();

  const comments = [...useSelector(selectAllComments)];

  useEffect(() => {
    if (comments.length === 0) {
      dispatch(addComments(data.comments));
    }
  }, [dispatch, comments.length]);

  return comments;
}