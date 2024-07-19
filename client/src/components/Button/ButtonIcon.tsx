import React from 'react'
import '../../styles/components/_button.scss'


interface ButtonIconProps {
    src: string;
    icon: string;
    style: string;
    onClick: () => void;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({src, icon, onClick, style}) => {
return (
    <button type='button' className={style}  onClick={onClick}>
        <img src={src} alt="icon"  className={`${icon}`} />
        
    </button>
)
}

export default ButtonIcon
