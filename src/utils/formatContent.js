const formatContent = (text) => {
  if (text.charAt(0) !== ' ') {
    if (text.charAt(0) !== ',') {
      return text = ' ' + text;
    }
    else if (text.charAt(1) !== ' ') {
      return text.slice(0, 1) + ' ' + text.slice(1);
    }
  }
  return text;
};

export default formatContent;