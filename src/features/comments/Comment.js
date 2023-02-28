import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Badge from "../../UI/Badge";
import formatContent from "../../utils/formatContent";
import { openModal } from "../modal/modalSlice";
import { selectUser } from "../user/user-slice";
import { decreaceScore, increaseScore, selectRepliesById } from "./comments-slice";
import EditContent from "./EditContent";
import NewReplyBox from "./NewReplyBox";

const CommentContainer = ({ children, id, ...props }) => {

  const replies = useSelector((state) => selectRepliesById(state, id))

  return (
    <div className="flex flex-col gap-y-6">
      <Comment id={id} {...props} />
      {replies?.length > 0 && <div className="grid justify-center grid-cols-[20px_1fr] md:grid-cols-[100px_1fr]">
        <span className="md:pl-12 w-px h-full border-r-2"></span>
        <ul className="flex flex-col gap-y-6">
          {replies.map((r) => <Comment key={r.id} parentId={id} {...r} />)}
        </ul>
      </div>}
    </div>
  )
}

const Comment = ({ id, user, content, createdAt, score, replyingTo, parentId = id }) => {

  const [isEditActive, setIsEditActive] = useState(false);
  const toggleEditBox = () => {
    setIsEditActive((prev) => !prev);
  }

  const [isReplyBoxBisible, setIsReplyBoxVisible] = useState(false);

  const dispatch = useDispatch();

  const toggleReplyBox = () => {
    setIsReplyBoxVisible((prev) => !prev);
  }

  const currentUser = useSelector(selectUser);

  return (
    <>
      <div className="grid md:grid-cols-[auto_1fr] md:grid-rows-none grid-rows-[1fr_auto] grid-cols-2 bg-white p-6 rounded-lg md:gap-x-5 gap-y-3">
        <div className="md:row-start-auto row-start-2 flex md:flex-col flex-row items-center gap-y-1 bg-main rounded-lg w-fit h-fit">
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
        <div className="md:col-start-auto col-start-1 col-end-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img alt='avatar' className="block w-8 h-8 mr-3" src={user.image.png} />
              <span className="font-medium text-sm mr-1.5">{user.username}</span>
              {user.username === currentUser.username && <Badge>You</Badge>}
              <span className="text-sm text-gray-500 ml-2">{createdAt}</span>
            </div>
            <div className="md:flex gap-x-5 hidden">
              {
                user.username === currentUser.username
                  ? <>
                    <button
                      onClick={() => dispatch(openModal(id))}
                      className="group flex items-center gap-x-1.5 font-bold text-red transition-colors hover:text-palered">
                      <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path className="group-hover:fill-palered transition-colors" d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368" /></svg>Delete
                    </button>
                    <button
                      onClick={toggleEditBox}
                      className="group flex items-center gap-x-1.5 font-bold text-purple transition-colors hover:text-hover">
                      <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path className="group-hover:fill-hover transition-colors" d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6" /></svg>Edit
                    </button>
                  </>
                  : <button
                    onClick={toggleReplyBox}
                    className="group flex items-center gap-x-1.5 font-bold text-purple transition-colors hover:text-hover">
                    <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path className="group-hover:fill-hover transition-colors" d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6" /></svg>Reply
                  </button>
              }
            </div>
          </div>
          {
            isEditActive
              ? <EditContent id={id} onClose={toggleEditBox} replyingTo={replyingTo}>
                {content}
              </EditContent>
              : <p className="text-gray-500">
                {replyingTo && <span className="text-purple font-medium">@{replyingTo}</span>}{formatContent(content)}
              </p>
          }
        </div>
        <div className="flex gap-x-5 md:hidden justify-end">
          {
            user.username === currentUser.username
              ? <>
                <button
                  onClick={() => dispatch(openModal(id))}
                  className="group flex items-center gap-x-1.5 font-bold text-red transition-colors hover:text-palered">
                  <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path className="group-hover:fill-palered transition-colors" d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368" /></svg>Delete
                </button>
                <button
                  onClick={toggleEditBox}
                  className="group flex items-center gap-x-1.5 font-bold text-purple transition-colors hover:text-hover">
                  <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path className="group-hover:fill-hover transition-colors" d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6" /></svg>Edit
                </button>
              </>
              : <button
                onClick={toggleReplyBox}
                className="group flex items-center gap-x-1.5 font-bold text-purple transition-colors hover:text-hover">
                <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path className="group-hover:fill-hover transition-colors" d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6" /></svg>Reply
              </button>
          }
        </div>
      </div>
      {isReplyBoxBisible && <NewReplyBox onClose={toggleReplyBox} id={parentId ? parentId : id} replyingTo={user.username} />}
    </>
  );
}

export default CommentContainer;