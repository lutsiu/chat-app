import path from 'path';
import fs from 'fs/promises'
import generateNumber from './generateNumber.ts';
export const createBaseDir = () => {
  return path.join(process.cwd(), "public", "uploads");
}
export  const createChatDir = async (chatId: string, dir: string) => {
  const chatDir = path.join(dir, `chat-${chatId}`);
  await fs.mkdir(chatDir, { recursive: true });
  return chatDir
}

export const createUserDir = async (userId: string, dir: string) => {
  const userDir = path.join(dir, `user-${userId}`)
  await fs.mkdir(userDir, { recursive: true });
  return userDir;
};  

export const createFileDir = async (dir: string, fileName: string, file: Buffer) => {
  const filePath = path.join(
    dir,
    `${fileName.replace(".", `-${generateNumber()}.`)}`
  );
  await fs.writeFile(filePath, file);
  return filePath;
}

export const createFilePathForDB = (dir: string) => {
  const filePathToReturn = path.relative(process.cwd(), dir);
  return filePathToReturn;
} 

export const deleteFileFromDevice = async (filePath: string) => {
  const fileDir = path.join(process.cwd(), filePath);
  await fs.unlink(fileDir);
}
