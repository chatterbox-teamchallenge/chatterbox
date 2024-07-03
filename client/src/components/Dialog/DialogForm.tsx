import React, { useState } from "react";
import { icons } from "../../constants/icons";
import ButtonIcon from "../Button/ButtonIcon";

const DialogForm = () => {
  const [textareaValue, setTextareaValue] = useState("")

  const handleInputChange = (e:any) => {
    setTextareaValue(e.target.value)

    e.target.style.height = 'auto'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  return (
    <div className="dialoginput">
      <div className="dialoginput__container">
        <textarea
          placeholder="Message"
          className="dialoginput__textarea"
          value={textareaValue}
          onChange={handleInputChange}
        />
        <div className="dialoginput__btns">
          <ButtonIcon src={icons.emoji} icon={'icon-emoji'} />
          <ButtonIcon src={icons.add} icon={'icon-add'} />
          <ButtonIcon src={icons.send} icon={'icon-send'} />
        </div>
      </div>
      <div className="dialoginput__btn">
        <ButtonIcon src={icons.microphone} icon={'microphone'} />
      </div>
    </div>
  );
};

export default DialogForm;
