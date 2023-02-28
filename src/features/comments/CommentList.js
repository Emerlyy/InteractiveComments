import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import { selectAllComments } from "./comments-slice";

const CommentList = () => {

  const comments = [...useSelector(selectAllComments)];

  // const onChangeScore = (id, value) => {
  //   dispatch(changeScore({ id, value }));
  // }

  return (
    <ul className="flex flex-col gap-y-6 mb-6">
      {comments.sort((a, b) => b.score >= a.score ? 1 : -1).map((comment) => {
        return (
          <li key={comment.id}>
            <Comment {...comment} />
          </li>
        )
      })}
    </ul>
  )
}

export default CommentList;