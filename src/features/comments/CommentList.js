import React from "react";
import Comment from "./Comment";
import { useComments } from './useComments';

const CommentList = () => {

  const comments = useComments();

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