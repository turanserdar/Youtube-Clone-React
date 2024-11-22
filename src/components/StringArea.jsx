import { useState } from 'react';

const StringArea = ({ text }) => {
  const [expand, setExpand] = useState(false);

  let shortText = text;

  // if the text is collapsed and longer than 300 characters,
  // truncate it and add "...read more" at the end
  if (!expand && text.length > 300) {
    shortText = text.slice(0, 300) + '...read more';
  }

  return (
    <div onClick={() => setExpand(!expand)}>
      {shortText.split('\n').map((line, index) => (
        <span key={index}>
          {line} <br />
        </span>
      ))}
    </div>
  );
};

export default StringArea;
