import React from 'react'

interface ButtonModalProps {
    text: string;
    styleBtn?: string;
    onClick?: () => void;
}

const ButtonModal: React.FC<ButtonModalProps> = ({text, styleBtn, onClick}) => {

return (
    <div>
        <button className={styleBtn} onClick={onClick}>
            {text}
        </button>
    </div>
)
}

export default ButtonModal
