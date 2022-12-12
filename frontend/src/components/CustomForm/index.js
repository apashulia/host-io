import React, { useEffect, useRef, useState } from "react";

const CustomForm = ({ onSubmit }) => {
  const [inputText, setInputText] = useState("");
  const refTextarea = useRef(null);

  const onInputChange = (e) => {
    setInputText(e.target.value.replace(" ", ""));
  };

  useEffect(() => {
    refTextarea.current.focus();
  }, []);

  return (
    <form
      className="form"
      onSubmit={(e) => onSubmit(e, inputText, setInputText)}>
      <label htmlFor="textarea" className="form_input">
        <span>Up to 10 input domain names one per line</span>
        <textarea
          ref={refTextarea}
          value={inputText}
          id="textarea"
          name="textarea"
          onChange={onInputChange}
          rows={10}
        />
      </label>
      <button type="submit">Highlight top ranking</button>
    </form>
  );
};

export default CustomForm;
