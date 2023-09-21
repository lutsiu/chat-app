import { IMessage } from "../interfaces/models";

export default async function downloadFile(message: IMessage) {
  const res = await fetch(
    `http://localhost:3000/chat/download-file?filePath=${message.file?.filePath}&fileName=${message.file?.fileName}`
  );
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = message.file?.fileName as string;
  document.body.append(a);
  a.click();
  window.URL.revokeObjectURL(url);
}