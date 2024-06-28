import React from 'react'

interface UserMessageProps{
    text: string;
}

const UserMessage: React.FC<UserMessageProps> = ({text}) => {
  return (
    <div>
      {text}
    </div>
  )
}

export default UserMessage
