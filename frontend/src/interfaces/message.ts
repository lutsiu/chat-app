import { MediaType } from "./models";


export interface MessageType {
  reply: {
    messageToReplyId: string;
    senderId: string
    mediaPath: string | null,
    mediaType: MediaType
  } | null;
  sendMessage: boolean;
  editMessage: {
    messageId: string | undefined;
  } | null;

}
