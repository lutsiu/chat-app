import { AiFillFile } from "react-icons/ai";
import { IFile, IMessage } from "../../../../../../interfaces/models";
import normalizeDateName from "../../../../../../utils/normalizeDateName";
import getSizeOfFile from "../../../../../../utils/getSizeOfFile";
interface Props {
  messages: IMessage[]
  chatId: string
}
export default function Files(props: Props) {
  const { messages, chatId } = props;
  return (
    <div className="min-w-full flex-1">
      {messages.map((msg, i) => {
        const file = msg.file as IFile;
        const dateToShow = normalizeDateName(msg.timeStamp);
        const fileSize = getSizeOfFile(file.fileSize);
        return (
          <div
            key={i}
            className="flex items-center gap-[0.6rem] p-[1rem] cursor-pointer "
          >
            <div>
              <AiFillFile className="text-6xl text-violet-500" />
            </div>
            <div>
              <h5 className="text-white text-xl font-medium">
                {file.fileName}
              </h5>
              <div className="text-gray-300 text-xl flex gap-[0.4rem]">
                <span>{fileSize}</span>
                <span>·</span>
                <span>{dateToShow}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
