import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../user/user-slice";
import { newComment } from "./comments-slice";

const NewComment = () => {

  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const textarea = useRef(null);


  useEffect(() => {
    const current = textarea.current;

    if (current !== null) {
      const handleChange = () => {
        if (current.scrollHeight - current.clientHeight > 5) {
          current.style.height = current.scrollHeight + "px";
        }
      }

      current.addEventListener('keyup', handleChange);

      return () => current.removeEventListener('keyup', handleChange);
    }
  }, [textarea]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const content = textarea.current.value;

    if (content.trim().length === 0)
      return;

    dispatch(newComment(content));

    textarea.current.style.height = '';

    e.currentTarget.reset();
  }


  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-[auto_1fr_auto] grid-cols-2 bg-white p-6 rounded-lg gap-5">
      <img className="h-10 w-10" alt='avatar' src={user?.image?.png} />
      <textarea ref={textarea} required placeholder="Add a comment..." className="md:col-auto md:row-auto row-start-1 col-start-1 col-end-3 overflow-hidden border rounded-lg resize-none flex-grow h-24 px-4 py-2 outline-none focus:ring-1 focus:ring-purple placeholder:text-gray-500"></textarea>
      <button
        className="justify-self-end text-white font-medium uppercase w-fit h-fit py-3 px-8 rounded-lg bg-purple transition-colors hover:bg-hover">
        Send
      </button>
    </form>
  );
}

export default NewComment;