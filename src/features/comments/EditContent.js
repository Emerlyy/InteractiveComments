import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import formatContent from "../../utils/formatContent";
import { changeContent } from "./comments-slice";

const EditContent = ({ id, onClose, replyingTo = '', children }) => {

  console.log(children);

  const to = replyingTo === '' ? '' : '@' + replyingTo;

  const [value, setValue] = useState(to + children);

  console.log(value);

  const textarea = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleChange = function () {
      if (this.scrollTop > 0) {
        console.log('d')
        this.style.height = this.scrollHeight + "px";
      }
    }
    textarea.current.addEventListener('keyup', handleChange);
  }, [textarea]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const content = textarea.current.value.slice(replyingTo === '' ? 0 : replyingTo.length + 1);

    if (content.trim().length === 0)
      return;

    dispatch(changeContent({ id, content }));

    onClose();
  }


  const handleChange = (e) => {
    const value = e.target.value;

    value.length < replyingTo.length + 1
      ? setValue(`@${replyingTo}`)
      : setValue(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-end bg-white rounded-lg gap-y-4">
      <textarea value={value} onChange={handleChange} ref={textarea} required placeholder="Edit a comment..." className="w-full border overflow-hidden rounded-lg resize-none h-24 px-4 py-2 outline-none focus:ring-1 focus:ring-purple placeholder:text-gray-500"></textarea>
      <button
        className="text-white font-medium uppercase h-fit py-3 px-8 rounded-lg bg-purple transition-colors hover:bg-hover">
        Update
      </button>
    </form>
  )
}

export default EditContent;