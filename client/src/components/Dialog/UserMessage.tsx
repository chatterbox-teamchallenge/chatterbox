import React from 'react'
import checked from '../../img/chat/dialog/checked.svg'

interface UserMessageProps{
  text: string;
  time: string;
  status: string;
}

const UserMessage: React.FC<UserMessageProps> = ({text, time, status}) => {
  return (
    <div className='usermsg'>
      <p className='usermsg__text'>{text}</p>
      <div className='usermsg__downbox'>
        <p className='usermsg__time'>{time}</p>
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

export default UserMessage
