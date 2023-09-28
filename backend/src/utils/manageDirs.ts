import path from 'path';
import fs from 'fs/promises'
import generateNumber from './generateNumber.ts';
export const createBaseDir = () => {
  return path.join(process.cwd(), "public", "uploads");
}
export  const createChatDir = async (chatId: string, baseDir: string) => {
  const chatDir = path.join(baseDir, `chat-${chatId}`);
  await fs.mkdir(chatDir, { recursive: true });
  return chatDir
}

export const createUserDir = async (userId: string, chatDir: string) => {
  const userDir = path.join(chatDir, `user-${userId}`)
  await fs.mkdir(userDir, { recursive: true });
  return userDir;
};  

export const createFileDir = async (userDir: string, fileName: string, file: Buffer) => {
  const filePath = path.join(
    userDir,
    `${fileName.replace(".", `-${generateNumber()}.`)}`
  );
  await fs.writeFile(filePath, file);
  return filePath;
}

export const createFilePathForDB = (fileDir: string) => {
  const filePathToReturn = path.relative(process.cwd(), fileDir);
  return filePathToReturn;
} 

export const deleteFileFromDevice = async (filePath: string) => {
  const fileDir = path.join(process.cwd(), filePath);
  await fs.unlink(fileDir);
}
