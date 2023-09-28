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
  if (message.message) {
    const width = window.innerWidth;
    const truncatedMessage =
      width >= 768
        ? message.message.slice(0, 70)
        : message.message.slice(0, 30);
    let threeDots= '';
    if (width >= 768 && message.message.length > 70) {
      threeDots = "...";
    }
    if (width < 768 && message.message.length > 30) {
      threeDots = "...";
    }
    return truncatedMessage + threeDots;
  }
  if (!message.message) {
    if (message.media.length === 1) {
      if (message.media[0].fileType.includes("video")) {
        return "Video";
      } else {
        return "Image";
      }
    }
    if (message.media.length > 1) {
      return "Album";
    }
  }

  return "";
};

export default getActionBarMessageContent;
