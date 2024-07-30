import { LastMessage } from "../../types/types";
import incoming from '../../img/chat/conversation/incoming.png'
import outgoing from '../../img/chat/conversation/outgoing.png'
import typing from '../../img/chat/conversation/typing.png'
import React, { useState } from "react";

interface ChatProps {
  lastMessageInfo: LastMessage;
}

const Chat: React.FC<ChatProps> = ({ lastMessageInfo }) => {
  const [messageState, setMessageState] = useState({
    icon: '',
    class: 'message__state'
  });

  React.useEffect(() => {
    if (lastMessageInfo.isTyping) setMessageState({icon: typing, class: 'message__state typing'})
    else if (lastMessageInfo.isIncoming) setMessageState({icon: incoming, class: 'message__state'})
    else if (!lastMessageInfo.isRead) setMessageState({icon: outgoing, class: 'message__state not-read'})
    else if (lastMessageInfo.isRead) setMessageState({icon: incoming, class: 'message__state read'})
  }, [lastMessageInfo])

  return (
    <div className="conversation">
      <div className="interlocutor__info__block">
        <div className="interlocutor__info__avatar">
          <img
            src={lastMessageInfo.interlocutorAvatar}
            alt="interlocutor avatar"
          />
          {lastMessageInfo.isOnline ? (
            <span className="status online"></span>
          ) : (
            <span className="status offline"></span>
          )}
        </div>
        <div className="interlocutor__info">
          <p className="interlocutor__info__name">
            {lastMessageInfo.interlocutorName}
          </p>

          <div className="interlocutor__info__message__state">
            <img className={messageState.class} src={messageState.icon} alt={messageState.class}/>
            {lastMessageInfo.isTyping ? (
              <p className="interlocutor__info__message typing">Typing...</p>
            ) : (
              <p className="interlocutor__info__message">
                {lastMessageInfo.messageText}
              </p>
            )}
          </div>
        </div>
      </div>
      <p className="interlocutor__info__time">{lastMessageInfo.sentTime}</p>
    </div>
  );
};

export default Chat;
