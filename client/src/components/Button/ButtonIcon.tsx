import React from 'react'
import '../../styles/components/_button.scss'


interface ButtonIconProps {
    src: string;
    icon: string;
    styleName: string;
    onClick: () => void;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({src, icon, onClick, styleName}) => {
return (
    <button type='button' className={styleName}  onClick={onClick}>
        <img src={src} alt="icon"  className={`${icon}`} />
        
    </button>
)
}

export default ButtonIcon
