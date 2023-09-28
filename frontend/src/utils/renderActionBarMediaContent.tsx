import { IMessage, MediaType } from "../interfaces/models";
interface Message {
  show: boolean;
  message: IMessage | null;
  senderId ?: string;
  messageUpperPoint: number | undefined;
  mediaPath: string | null;
  mediaType: MediaType;
}
const renderMediaContent = (message: Message) => {
  if (message.mediaPath) {
    if (message.mediaType === "image") {
      return (
        <img
          src={message.mediaPath}
          className="object-cover h-full w-full"
          alt="Image"
        />
      );
    } else if (message.mediaType === "video") {
      return (
        <video className="object-cover h-full w-full" controls>
          <source src={message.mediaPath} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
  }
  return null;
};

export default renderMediaContent