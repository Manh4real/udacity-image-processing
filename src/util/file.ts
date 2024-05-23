export const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];

export function getFileNameWithExt(fileName: string) {
  const defaultExt = "jpg";

  const ext = fileName.split(".").at(-1) || "";
  const fileNameWithExt = imageExtensions.includes(ext)
    ? fileName
    : `${fileName}.${defaultExt}`;

  return fileNameWithExt;
}
