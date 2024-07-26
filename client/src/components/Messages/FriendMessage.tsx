import React from 'react'
import checked from '../../img/chat/dialog/checked.svg'
import '../../styles/components/_message.scss'

interface FriendMessageProps{
  text: string;
  time: string;
  status: string;
}

const FriendMessage: React.FC<FriendMessageProps> = ({text, time, status}) => {
  return (
    <div >
      <p className='frndmsg__text'>{text}</p>
      <div className='frndmsg__downbox'>
        <p className='frndmsg__time'>{time}</p>
        <span>
          <img src={checked} alt="read" />
          {/* <svg className="icon">
            <use href="../../img/chat/dialog/checked.svg"></use>
          </svg> */}
        </span>
      </div>
    </div>
  )
}

export default FriendMessage
