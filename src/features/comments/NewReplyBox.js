import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../user/user-slice";
import { newReply } from "./comments-slice";

const NewReplyBox = ({ id, replyingTo, onClose }) => {

  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const [value, setValue] = useState('@' + replyingTo + ' ');

  const textarea = useRef(null);

  useEffect(() => {
    const current = textarea.current;

    if (current !== null) {

      const handleChange = () => {
        current.style.height = current.scrollHeight + "px";
      }

      handleChange();

      current.addEventListener('keyup', handleChange);

      return () => current.removeEventListener('keyup', handleChange);
    }
  }, [textarea.current]);

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
    <form onSubmit={handleSubmit} className="grid md:grid-cols-[auto_1fr_auto] grid-cols-2 bg-white p-6 rounded-lg gap-5">
      <img className="h-10 w-10" src={user?.image?.png} />
      <textarea ref={textarea} value={value} onChange={handleChange} required placeholder="Add a reply..." className="md:col-auto md:row-auto row-start-1 col-start-1 col-end-3 border rounded-lg resize-none flex-grow h-24 px-4 py-2 outline-none focus:ring-1 focus:ring-purple placeholder:text-gray-500"></textarea>
      <button
        className="justify-self-end text-white font-medium uppercase w-fit h-fit py-3 px-8 rounded-lg bg-purple transition-colors hover:bg-hover">
        Reply
      </button>
    </form>
  );
}

export default NewReplyBox;