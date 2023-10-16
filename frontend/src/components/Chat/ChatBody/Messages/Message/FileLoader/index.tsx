import { IFile, IMessage } from "../../../../../../interfaces/models";
import getSizeOfFile from "../../../../../../utils/getSizeOfFile";
import { AiFillFile } from "react-icons/ai";
import downloadFile from "../../../../../../utils/downloadFile";
import { useDispatch } from "react-redux";
import { setShowMediaOverlay } from "../../../../../../state/chatUI";
import BACKEND_SERVER from "../../../../../../utils/VARIABLES";
interface Props {
  file: IFile;
  message: IMessage;
}

export default function FileLoader(props: Props) {
  const { file, message } = props;
  const { fileName, filePath, fileSize, fileType } = file;
  const sizeToShow = getSizeOfFile(fileSize);
  const dispatch = useDispatch();
  let thumbNail: React.ReactNode;
  if (fileType.includes("image")) {
    thumbNail = (
      <img
        className="w-full h-full object-cover object-top"
        src={`${BACKEND_SERVER}/${filePath}`}
      />
    );
  }
  if (!fileType.includes("image")) {
    thumbNail = (
      <div className="w-full h-full bg-purple-400 flex items-center justify-center">
        <AiFillFile className="w-[50%] h-[50%]" />
      </div>
    );
  }

  async function handleInteractWithFile() {
    if (fileType.includes("image")) {
      dispatch(setShowMediaOverlay({ file, message, showOverlay: true }));
    } else {
      downloadFile(file);
    }
  }
  return (
    <>
      <div
        className="flex items-center gap-[1rem] cursor-pointer mb-[1rem]"
        onClick={handleInteractWithFile}
      >
        <div className="w-[6rem] h-[6rem] overflow-hidden rounded-xl">
          {thumbNail}
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-semibold">{fileName}</span>
          <span className="text-xl font-normal">{sizeToShow}</span>
        </div>
      </div>
    </>
  );
}
