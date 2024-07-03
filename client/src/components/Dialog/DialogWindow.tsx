import React from 'react'
import FriendMessage from './FriendMessage'
import UserMessage from './UserMessage'
import checked from '../../img/chat/dialog/checked.svg'

const DialogWindow = () => {
  return (
    <div className='dialogwind'>
      <FriendMessage text={'Hello! How R U?'} time={'12:30 AM'} status={checked} />
      <FriendMessage text={'Will you be at the conference on Saturday? I have to discuss with you the design of the site'} time={'12:30 AM'} status={checked }/>
      
      <UserMessage text={'Hello! How R U?'} time={'12:30 AM'} status={checked} />
      <UserMessage text={'Will you be at the conference on Saturday? I have to discuss with you the design of the site'} time={'12:30 AM'} status={checked } />
      
    </div>
  )
}

export default DialogWindow
