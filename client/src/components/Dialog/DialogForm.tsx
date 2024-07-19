import React, { useState } from "react";
import { icons } from "../../constants/icons";
import ButtonIcon from "../Button/ButtonIcon";

interface DialogFormProps {
  addMessages: (text: string) => void;
}


const DialogForm:  React.FC<DialogFormProps>  = ({addMessages}) => {
  const [textareaValue, setTextareaValue] = useState("")

  const handleInputChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value)

    e.target.style.height = 'auto'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  const handleSendMessage = () => {
    if (textareaValue.trim()) {
      addMessages(textareaValue)
      setTextareaValue("")
    }
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
          <ButtonIcon onClick={()=> {}}  src={icons.emoji} icon={'icon-emoji'} style='btn-icon '/>
          <ButtonIcon onClick={()=> {}}  src={icons.add} icon={'icon-add'} style='btn-icon '/>
          <ButtonIcon onClick={handleSendMessage} src={icons.send} icon={'icon-send'} style='btn-icon '/>
        </div>
      </div>
      <div className="dialoginput__btn">
        <ButtonIcon onClick={()=>{}} src={icons.microphone} icon={'microphone'} style='btn-icon '/>
      </div>
    </div>
  );
};

export default DialogForm;
