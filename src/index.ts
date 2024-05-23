import express from "express";
import morgan from "morgan";
import sharp from "sharp";
import { promises as fsPromises } from "fs";

const app = express();
const port = 3000;

app.use(morgan("dev"));
const path = `E:/F/Udacity/Fullstack/image-processing-proj/src/assets`;
const fullImagesPath = `${path}/full`;
const thumbImagesPath = `${path}/thumb`;

app.get("/api/images", async (req, res) => {
  const { fileName, width, height } = req.query;

  switch (true) {
    case !fileName:
      res.status(400).send({
        error: "No file name provided.",
        status: 400,
      });
      return;
    case width == null || width === "":
      res.status(400).send({
        error: "No width provided.",
        status: 400,
      });
      return;
    case height == null || height === "":
      res.status(400).send({
        error: "No height provided.",
        status: 400,
      });
      return;
  }

  try {
    const result = await fsPromises.readFile(
      `${fullImagesPath}/${fileName}.jpg`
    );

    const data = await sharp(result.buffer)
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
