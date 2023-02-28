import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import formatContent from "../../utils/formatContent";
import { selectUser } from "../user/user-slice";
import { newReply } from "./comments-slice";

const NewReplyBox = ({ id, replyingTo, onClose }) => {

  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const [value, setValue] = useState('@' + replyingTo + ' ');

  const textarea = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const content = textarea.current.value.slice(replyingTo.length + 1);

    if (content.trim().length === 0)
      return;

    dispatch(newReply({ id, replyingTo, content }));

    onClose();
    setValue('');
  }

  const handleChange = (e) => {

    const { value } = e.target;

    value.length > replyingTo.length + 1
      ? setValue(e.target.value)
      : setValue('@' + replyingTo);
  }

  return (
    <form onSubmit={handleSubmit} className="flex bg-white p-6 rounded-lg gap-x-5">
      <img className="h-10 w-10" src={user?.image?.png} />
      <textarea value={value} onChange={handleChange} ref={textarea} required placeholder="Add a comment..." className="border rounded-lg resize-none flex-grow h-24 px-4 py-2 outline-none focus:ring-1 focus:ring-purple placeholder:text-gray-500"></textarea>
      <button
        className="text-white font-medium uppercase h-fit py-3 px-8 rounded-lg bg-purple transition-colors hover:bg-hover">
        Reply
      </button>
    </form>
  );
}

export default NewReplyBox;