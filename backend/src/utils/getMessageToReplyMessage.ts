import { IMessage } from "../interfaces/models.ts";

export default function getMessageToReplyMessage(message: IMessage, mediaType: null | 'video' | 'image') {
  if (message.message && message.media.length === 0) {
    return message.message
  }
  if (message.media.length === 1) {
    if (mediaType === 'video') {
      return "Video"
    }
    if (mediaType === 'image' ) {
      return 'Image'
    }
  } 
  if (message.media.length > 1) {
    return 'Album'
  }
  if (message.file && !message.message) {
    return message.file.fileName
  }
}