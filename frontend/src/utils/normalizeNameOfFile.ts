export default function normalizeNameOfFile(fileName: string) {
  const indexOfLastDot = fileName.lastIndexOf(".");
  const properFilename =
    fileName.length >= 40
      ? fileName.slice(0, 20) + "..." + fileName.slice(indexOfLastDot, -1)
      : fileName;
  return properFilename;
}
