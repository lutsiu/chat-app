

export interface MessageType {
  reply: {
    messageToReplyId: string;
    senderId: string
  } | null;
  sendMessage: boolean;
  editMessage: {
    messageId: string | undefined;
  } | null;
}
