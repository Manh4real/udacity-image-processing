import { promises as fsPromises } from "fs";
import path from "path";
import sharp from "sharp";

export const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];

export function getFileNameWithExt(fileName: string) {
  const defaultExt = "jpg";

  const ext = fileName.split(".").at(-1) || "";
  let finalExt = ext;

  let fileNameWithExt: string;
  if (imageExtensions.includes(ext)) {
    fileNameWithExt = fileName;
  } else {
    fileNameWithExt = `${fileName}.${defaultExt}`;
    finalExt = defaultExt;
  }

  return {
    fileNameWithExt,
    ext: finalExt,
  };
}

export async function transformFile(
  fileName: string,
  width: number,
  height: number,
): Promise<string> {
  const _path = path.resolve(__dirname, "../../../src/assets");

  const fullImagesPath = `${_path}/full`;
  const thumbImagesPath = `${_path}/thumb`;

  const _fileName = fileName as string;
  const info = getFileNameWithExt(_fileName);

  const readFileResult = await fsPromises.readFile(
    `${fullImagesPath}/${info.fileNameWithExt}`,
  );

  const data = await sharp(readFileResult.buffer)
    .resize(width, height)
    .jpeg({ mozjpeg: true })
    .toBuffer();

  const tranformedFileName = `${thumbImagesPath}/${fileName}-${width}x${height}.${info.ext}`;
  await fsPromises.writeFile(tranformedFileName, data, {});

  return tranformedFileName;
}
