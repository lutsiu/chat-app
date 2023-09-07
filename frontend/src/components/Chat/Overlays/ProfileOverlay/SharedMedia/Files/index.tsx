import { AiFillFile, AiFillFileAdd } from "react-icons/ai";
import { useState } from "react";
interface Props {
  files: { fileName: string; size: string; date: string }[];
}
export default function Files(props: Props) {
  const { files } = props;

  return (
    <div className="min-w-full flex-1">
      {files.map((file, i) => {
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
                <span>{file.size}</span>
                <span>·</span>
                <span>{file.date}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
