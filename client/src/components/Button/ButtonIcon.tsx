import React from 'react'
import '../../styles/components/_button.scss'


interface ButtonIconProps {
    src: string;
    icon: string;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({src, icon}) => {
return (
    <div className='btn-icon' >
        <img src={src} alt="icon"  className={`${icon}`} />
        
    </div>
)
}

export default ButtonIcon
