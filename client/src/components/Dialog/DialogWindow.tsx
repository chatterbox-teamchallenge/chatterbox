import React, { useEffect, useRef, useState } from 'react'
import FriendMessage from './FriendMessage'
import UserMessage from './UserMessage'
import checked from '../../img/chat/dialog/checked.svg'
import { icons } from "../../constants/icons";
import DialogForm from '../Dialog/DialogForm'
import CurrentDate from './CurrentDate'
import ContextMenu from './ContextMenu'
import ButtonIcon from '../Button/ButtonIcon';


interface Message {
  text: string;
  time: string;
  status: string;
  isUser: boolean;
}

const initialMessages: Message[] = [
  { text: 'Hello! How R U?', time: '12:30 AM', status: checked, isUser: false },
  { text: 'Will you be at the conference on Saturday? I have to discuss with you the design of the site', time: '12:30 AM', status: checked, isUser: false },
  { text: 'Hello! How R U?', time: '12:30 AM', status: checked, isUser: true },
  { text: 'Will you be at the conference on Saturday? I have to discuss with you the design of the site', time: '12:30 AM', status: checked, isUser: true },
];


const DialogWindow  = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('messages')
    return savedMessages ? JSON.parse(savedMessages) : initialMessages
  })

  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; index: number } | null>(null)
  const [textareaValue, setTextareaValue] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editMessage, setEditMessage] = useState<{ index: number;  text: string} | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages))
    scrollToBottom()
  }, [messages])


  
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({behavior: 'smooth'})
    }
  }

  const handleRightClick = (event: React.MouseEvent, index: number) => {
    event.preventDefault()
    setContextMenu({x: event.clientX, y: event.clientY, index})
  }

  const handleEdit = () => {
    if (contextMenu) {
      const messageText = messages[contextMenu.index].text;
      setEditMessage({ index: contextMenu.index, text: messageText });
      setTextareaValue(messageText);
      setIsEditing(true);
      setContextMenu(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  

  const handleDelete = () => {
    if (contextMenu) {
      const updatedMessages = messages.filter((_, i) => i !== contextMenu.index)
      setMessages(updatedMessages)
      setContextMenu(null)
    }
  }

  const handleSaveEdit = () => { 
    if (editMessage) {
      const updatedMessages = [...messages]
      updatedMessages[editMessage.index].text = textareaValue
      setMessages(updatedMessages)
      setIsEditing(false)
      setEditMessage(null)
    }
  }

  const handleCloseContextMenu = () => {
    setContextMenu(null)
  }
  const getCurrentTime = (): string => {
    const date: Date = new (window as any).Date()
    let hours: number = date.getHours()
    let minutes: number = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString()
    return hours + ':' + minutesStr + ' ' + ampm
  }

  const addMessages = (text: string) => {
    const newMessages: Message = {
      text: text,
      time: getCurrentTime(),
      status: checked,
      isUser: true
    }
    setMessages([...messages, newMessages])
  }


  return (
    <div className='dialogwind'>
      <div className='messages__container'>
      <CurrentDate />
          {messages.map((message, index) => (
          message.isUser ? (
            <div className='usermsg' onContextMenu={(e) => handleRightClick(e, index)} key={index}>
              <UserMessage
                key={index}
                text={message.text}
                time={message.time}
                status={message.status}
              />
            </div>
          ) : (
              <div className='frndmsg' onContextMenu={(e) => handleRightClick(e, index)} key={index}>
                <FriendMessage
                  key={index}
                  text={message.text}
                  time={message.time}
                  status={message.status}
                />
            </div>
          )           
        ))}
        <div ref={messagesEndRef} />
      </div>
        
      {isEditing && editMessage ? (
        <div className='edit'>
          
          <div className='edit__form'>
            <div className='edit__window'>
            <p>{editMessage.text}</p>
          </div>
            <div className='edit__container'>
            <textarea
            value={textareaValue}
            onChange={handleInputChange}
            className='edit__textarea'
          />
          </div>
          
          
          </div>
          <ButtonIcon
            onClick={handleSaveEdit}
            src={icons.send}
            icon={'icon-send'}
            styleName='dialoginput__btn'
          />
        </div>
      ) : (
          <DialogForm addMessages={addMessages} />
      )}


      
      {contextMenu && (
        <ContextMenu 
          x={contextMenu.x}
          y={contextMenu.y}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClose={handleCloseContextMenu}
        />
      )}
      
    </div>
  )
}

export default DialogWindow
