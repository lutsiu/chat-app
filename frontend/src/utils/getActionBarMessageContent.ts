import { IMessage, MediaType } from "../interfaces/models";
interface Message {
  show: boolean;
  message: IMessage | null;
  senderId?: string;
  messageUpperPoint: number | undefined;
  mediaPath: string | null;
  mediaType: MediaType;
}
const getActionBarMessageContent = (message: Message) => {
  if (message.message) {
    if (message.message.file) {
      return message.message.file.fileName
    }
    if (message.message.media.length === 0) {
      const truncatedMessage = message.message.message.slice(0, 70);
      return message.message.message.length > 70
        ? truncatedMessage + "..."
        : truncatedMessage;
    }
    if (message.message.media.length === 1) {
      if (message.mediaType === "video") {
        return "Video";
      } else {
        return "Image";
      }
    }
    if (message.message.media.length > 1) {
      return "Album";
    }
    
  } 

  return "";
};

export const getPinnedbarMessageContent = (message: IMessage) => {
  const width = window.innerWidth;

  if (message.message) {
    const maxLength = width >= 768 ? 70 : 30;
    const truncatedMessage = message.message.slice(0, maxLength);
    const threeDots = message.message.length > maxLength ? "..." : "";

    return truncatedMessage + threeDots;
  }

  if (message.media.length === 1) {
    return message.media[0].fileType.includes("video") ? "Video" : "Image";
  }

  if (message.media.length > 1) {
    return "Album";
  }

  if (message.file) {
    const maxLength = width >= 768 ? 70 : 30;
    const truncatedMessage = message.file.fileName.slice(0, maxLength);
    const threeDots = message.file.fileName.length > maxLength ? "..." : "";

    return truncatedMessage + threeDots;
  }

  return "";
};

export default getActionBarMessageContent;
