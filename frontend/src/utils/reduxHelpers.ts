import { handleEditMessage, handleReplytoMessage } from "../state/message"
export const closeEditMessage = () => {
  return handleEditMessage({
    message: null,
    show: false,
    messageUpperPoint: undefined,
    mediaPath: null,
    mediaType: null,
  });
};
export const closeReplyMessage = () => {
  return handleReplytoMessage({
    message: null,
    show: false,
    messageUpperPoint: undefined,
    senderId: "",
    mediaPath: null,
    mediaType: null,
  });
};