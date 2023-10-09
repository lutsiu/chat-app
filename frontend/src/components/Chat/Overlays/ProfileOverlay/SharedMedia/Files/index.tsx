import { IFile, IMessage } from "../../../../../../interfaces/models";

import Content from "./Content";
interface Props {
  messages: IMessage[];
}
export default function Files(props: Props) {
  const { messages } = props;
  return (
    <div className="min-w-full flex-1">
      {messages.map((msg) => {
        const file = msg.file as IFile;

        return (
          <Content
            key={file.fileName}
            file={file}
            message={msg}
          />
        );
      })}
    </div>
  );
}
