export type LastMessage = {
    interlocutorName: string;
    interlocutorAvatar: string;
    messageText: string;
    isIncoming: boolean;
    isRead?: boolean;
    sentTime: string;
    isTyping?: boolean;
    isOnline: boolean;
}