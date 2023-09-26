import { IFile } from "../interfaces/models";
export default async function downloadFile(file: IFile) {
  const res = await fetch(
    `http://localhost:3000/chat/download-file?filePath=${file?.filePath}&fileName=${file?.fileName}`
  );
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = file?.fileName as string;
  document.body.append(a);
  a.click();
  window.URL.revokeObjectURL(url);
}