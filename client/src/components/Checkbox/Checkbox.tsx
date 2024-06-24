interface CheckboxProps {
    text: string;
    checked: boolean;
    handleClick: any;
  }
  
  export default function Checkbox({
    text,
    checked,
    handleClick,
  }: CheckboxProps) {
    return (
      <div className="checkbox">
        <input
          className={`${checked && "checked"}`}
          type="checkbox"
          checked={checked}
        />
        <p onClick={handleClick}>{text}</p>
      </div>
    );
  }