import express from "express";
import morgan from "morgan";
import sharp from "sharp";
import { promises as fsPromises } from "fs";
import { errorHandler } from "./middlewares";
import { getFileNameWithExt } from "./util/file";

export const app = express();
const port = 3000;

app.use(morgan("dev"));

const path = `E:/F/Udacity/Fullstack/image-processing-proj/src/assets`;
const fullImagesPath = `${path}/full`;
const thumbImagesPath = `${path}/thumb`;

app.get("/api/images", errorHandler, async (req, res) => {
  const { fileName, width, height } = req.query;

  try {
    const _fileName = fileName as string;
    const fileNameWithExt = getFileNameWithExt(_fileName);

    const readFileResult = await fsPromises.readFile(
      `${fullImagesPath}/${fileNameWithExt}`,
    );

    const data = await sharp(readFileResult.buffer)
      .resize(Number(width), Number(height))
      .jpeg({ mozjpeg: true })
      .toBuffer();

    const tranformedFileName = `${thumbImagesPath}/${fileName}-${width}x${height}.jpg`;
    await fsPromises.writeFile(tranformedFileName, data, {});

    res.status(200).sendFile(tranformedFileName);
  } catch (err) {
    res.status(500).send({
      error: "Error when processing file. The file may not exist",
      status: 500,
    });
  }
});

app.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
});
