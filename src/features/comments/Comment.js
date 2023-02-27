import React from "react";
import { useDispatch } from "react-redux";
import { decreaceScore, increaseScore } from "./comments-slice";

const CommentContainer = ({ children, onReply, ...props }) => {
  return (
    <div className="flex flex-col gap-y-6">
      <Comment onReply={onReply} {...props} />
      {React.Children.count(children) > 0 && <div className="grid justify-center grid-cols-[100px_1fr]">
        <span className="pl-12 w-px h-full border-r-2"></span>
        <ul className="flex flex-col gap-y-6">
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, { onReply });
          })}
        </ul>
      </div>}
    </div>
  )
}

const Comment = ({ id, user, content, createdAt, score, replyingTo, onReply }) => {

  const dispatch = useDispatch();

  return (
    <div className="flex bg-white p-6 rounded-lg gap-x-5">
      <div className="flex flex-col items-center  gap-y-1 bg-main rounded-lg h-fit">
        <button
          onClick={() => dispatch(increaseScore(id))}
          className="group transition-colors flex w-10 h-8 items-center justify-center">
          <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path className='group-hover:fill-purple transition-colors' d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF" /></svg>
        </button>
        <span className="text-purple font-bold text-base">{score}</span>
        <button
          onClick={() => dispatch(decreaceScore(id))}
          className="group transition-colors flex w-10 h-8 items-center justify-center">
          <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path className='group-hover:fill-purple transition-colors' d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF" /></svg>
        </button>
      </div>
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-x-4 items-center">
            <img className="block w-8 h-8" src={user.image.png} />
            <span className="font-medium text-sm">{user.username}</span>
            <span className="text-sm text-gray-500">{createdAt}</span>
          </div>
          <button
            onClick={() => onReply(id)}
            className="group flex items-center gap-x-1.5 font-bold text-purple transition-colors hover:text-hover">
            <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path className="group-hover:fill-hover transition-colors" d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6" /></svg>Reply
          </button>
        </div>
        <p className="text-gray-500">
          {replyingTo && <span className="text-purple font-medium">@{replyingTo} </span>}{content}
        </p>
      </div>
    </div>
  );
}

export default CommentContainer;