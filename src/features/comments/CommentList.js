import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import { selectAllComments } from "./comments-slice";

const CommentList = () => {

  const comments = useSelector(selectAllComments);

  console.log(comments);

  const dispatch = useDispatch();

  // const onChangeScore = (id, value) => {
  //   dispatch(changeScore({ id, value }));
  // }

  const createReplyBox = (id) => {
    console.log(id);
  }

  return (
    <ul className="flex flex-col gap-y-6 mb-6">
      {comments.map((comment) => {
        return (
          <li key={comment.id}>
            <Comment onReply={createReplyBox} {...comment}>
              {comment.replies.map((reply) => {
                return <li key={reply.id}><Comment {...reply} /></li>
              })}
            </Comment>
          </li>
        )
      })}
    </ul>
  )
}

export default CommentList;