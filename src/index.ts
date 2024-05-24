import express from "express";
import morgan from "morgan";
import { errorHandler } from "./middlewares";
import { transformFile } from "./util/file";

export const app = express();
const port = 3000;

app.use(morgan("dev"));

app.get("/api/images", errorHandler, async (req, res) => {
  const { fileName, width, height } = req.query;

  try {
    const tranformedFileName = await transformFile(
      String(fileName),
      Number(width),
      Number(height),
    );

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
