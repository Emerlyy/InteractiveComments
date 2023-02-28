import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../user/user-slice";
import { newComment } from "./comments-slice";

const NewComment = () => {

  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const textarea = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const content = textarea.current.value;

    if (content.trim().length === 0)
      return;

    dispatch(newComment(content));

    e.currentTarget.reset();
  }


  return (
    <form onSubmit={handleSubmit} className="flex bg-white p-6 rounded-lg gap-x-5">
      <img className="h-10 w-10" src={user?.image?.png} />
      <textarea ref={textarea} required placeholder="Add a comment..." className="border rounded-lg resize-none flex-grow h-24 px-4 py-2 outline-none focus:ring-1 focus:ring-purple placeholder:text-gray-500"></textarea>
      <button
        className="text-white font-medium uppercase h-fit py-3 px-8 rounded-lg bg-purple transition-colors hover:bg-hover">
        Send
      </button>
    </form>
  );
}

export default NewComment;