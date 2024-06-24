import { useState } from "react";
import { icons } from "../../constants/icons";

interface InputProps {
  placeholder?: string;
  type: string;
  state: string;
  registerType?: any;
  handleBlur?: any;
}

export default function Input({
  placeholder,
  type,
  state,
  registerType,
  handleBlur,
}: InputProps) {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isAlertShown, setIsAlertShown] = useState(false);

  function showPassword() {
    setIsPasswordShown(!isPasswordShown);
  }

  function showIcon(state: string) {
    switch (state) {
      case "default": {
        return type === "password" && isPasswordShown ? (
          <img
            className="password__icon"
            src={icons.password}
            alt="password"
            onClick={showPassword}
            onMouseDown={(e) => e.preventDefault()}
          />
        ) : type === "password" && !isPasswordShown ? (
          <img
            className="password__icon"
            src={icons.passwordHidden}
            alt="password"
            onClick={showPassword}
            onMouseDown={(e) => e.preventDefault()}
          />
        ) : null;
      }
      case "correct": {
        return <img className="correct__icon" src={icons.correct} alt="correct" />;
      }
      default: {
        return (
          <img
            className="alert__icon"
            src={icons.alert}
            alt="wrong value"
            onMouseOver={() => setIsAlertShown(true)}
            onMouseOut={() => setIsAlertShown(false)}
          />
        );
      }
    }
  }

  return (
    <div className="custom__input__wrapper" onBlur={handleBlur}>
      <input
        className={`custom__input ${
          state === "default"
            ? "default"
            : state === "correct"
            ? "correct"
            : "alert"
        }`}
        placeholder={`${placeholder}`}
        type={
          type === "password" && isPasswordShown
            ? "text"
            : type === "password"
            ? "password"
            : "text"
        }
        {...registerType}
      />
      {showIcon(state)}
      {isAlertShown ? (
        <div className="alert__message">
          <p>{state}</p>
        </div>
      ) : null}
    </div>
  );
}