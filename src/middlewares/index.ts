import { RequestHandler } from "express";

export const errorHandler: RequestHandler = (req, res, next) => {
  const { fileName, width, height } = req.query;

  switch (true) {
    case !fileName:
      res.status(400).send({
        error: "No file name provided.",
        status: 400,
      });
      return;
    case width == null || width === "" || Number.isNaN(Number(width)):
      res.status(400).send({
        error: "No width provided or in wrong format.",
        status: 400,
      });
      return;
    case height == null || height === "" || Number.isNaN(Number(height)):
      res.status(400).send({
        error: "No height provided or in wrong format.",
        status: 400,
      });
      return;
  }

  next();
};
