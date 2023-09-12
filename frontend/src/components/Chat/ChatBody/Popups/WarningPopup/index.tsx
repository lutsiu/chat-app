export default function WarningPopup() {
  return (
    <div
      className="absolute top-[50%]  left-[50%] bg-purple-600 p-[1.5rem] rounded-xl text-xl"
      style={{transform: 'translateX(-50%)'}}
    >
      You can upload up to 6 media files or 1 file of another type. Maximum size of file is 10mb
    </div>
  );
}
