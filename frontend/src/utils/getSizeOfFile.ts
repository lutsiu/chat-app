export default function getSizeOfFile(size: number) {
  const MILLION = 1000000;
  const unitOfMeasure = size < MILLION ? "KB" : "MB";
  const sizeToShow = (size < MILLION ? size / 10000 : size / MILLION).toFixed(
    2
  );
  return `${sizeToShow} ${unitOfMeasure}`
}
