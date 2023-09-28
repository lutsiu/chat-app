import { IReply } from "../../../../../../interfaces/models";
import styles from "../styles.module.scss";

interface Props {
  reply: IReply;
  handleScrollToMessageYouReplied: () => void;
}
export default function Reply(props: Props) {
  const { reply, handleScrollToMessageYouReplied } = props;
  return (
    <div
      className={`${styles.reply} duration-200 flex gap-[.7rem]  items-center border-l-[.3rem] border-l-white pl-[0.8rem]  cursor-pointer`}
      onClick={handleScrollToMessageYouReplied}
    >
      {reply.mediaPath && <div className="w-[3.5rem] h-[3.5rem] overflow-hidden rounded-lg">
        {reply.mediaPath && reply.mediaType === "image" && (
          <img src={reply.mediaPath} className="w-full h-full object-cover" />
        )}
        {reply.mediaPath && reply.mediaType === "video" && (
          <video className="w-full h-full object-cover">
            <source src={reply.mediaPath} type="video/mp4" />
          </video>
        )}
      </div>}
      <div className="flex flex-col ">
        <span className="font-semibold text-lg">
          {reply.messageToReplyRecipientName.slice(0, 7)}
          {reply.messageToReplyRecipientName.length > 7 ? "..." : ""}
        </span>
        <span className="text-lg font-medium">
          {reply.messageToReplyMessage.slice(0, 6)}
          {reply.messageToReplyMessage.length > 6 ? "..." : ""}
        </span>
      </div>
    </div>
  );
}
