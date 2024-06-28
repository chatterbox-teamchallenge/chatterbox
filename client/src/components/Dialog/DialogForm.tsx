import React from "react";
import emoji from "../../img/chat/dialog/emoji.svg";
import add from "../../img/chat/dialog/add.svg";
import sent from "../../img/chat/dialog/sent.svg";
import microph from "../../img/chat/dialog/microph.svg";
import { icons } from "../../constants/icons";
import ButtonIcon from "../Button/ButtonIcon";

const DialogForm = () => {
  return (
    <div className="dialoginput">
      <div className="dialoginput__container">
        <textarea placeholder="Message" className="dialoginput__textarea" />
        <div className="dialoginput__btns">
          <ButtonIcon src={icons.emoji} icon={'emoji'} />
          <ButtonIcon src={icons.add} icon={'add'} />
          <ButtonIcon src={icons.send} icon={'send'} />
        </div>
      </div>
      <div className="dialoginput__btn">
        <ButtonIcon src={icons.microphone} icon={'microphone'} />
      </div>
    </div>
  );
};

export default DialogForm;
