import avatar from "../../img/chat/dialog/kate.jpg";
import { LastMessage } from "../../types/types";
import Chat from "../Chat/Chat";

const ChatList: React.FC = ({}) => {
  const conversations: Array<LastMessage> = [
    {
      interlocutorName: "Kate",
      interlocutorAvatar: avatar,
      messageText: "Hello! How R U?",
      isIncoming: true,
      sentTime: "11:45 AM",
      isOnline: true,
    },
    {
      interlocutorName: "Mary",
      interlocutorAvatar: avatar,
      messageText: "Hello! It's me!",
      isIncoming: true,
      sentTime: "03:00 AM",
      isOnline: false,
    },
    {
      interlocutorName: "David",
      interlocutorAvatar: avatar,
      messageText: "Hello!",
      isIncoming: false,
      isRead: false,
      sentTime: "03:00 PM",
      isOnline: true,
    },
    {
      interlocutorName: "Olga",
      interlocutorAvatar: avatar,
      messageText: "Hi! Let's discuss our plans for this weekend.",
      isIncoming: false,
      isRead: true,
      sentTime: "03:50 PM",
      isOnline: true,
    },
    {
      interlocutorName: "Tina",
      interlocutorAvatar: avatar,
      messageText: "Hello!",
      isIncoming: false,
      isRead: true,
      isTyping: true,
      sentTime: "02:20 AM",
      isOnline: false,
    },
  ];

  return (
    <div className="conversation__list">
      {conversations.map((chat, index) => {
        return <Chat lastMessageInfo={chat} />;
      })}
    </div>
  );
};

export default ChatList;
