import express from "express";
import supertest from "supertest";
import { app } from "../../src";

const request = supertest(app);

describe("Test endpoint responses", () => {
  it("gets the api endpoint", (done) => {
    request
      .get("/api/images?fileName=pic-1&width=200&height=200")
      .then((response) => {
        expect(response.status).toBe(200);
        done();
      });
  });

  it("gets the wrong api endpoint", (done) => {
    request
      .get("/api/image?fileName=pic-1&width=200&height=200")
      .then((response) => {
        expect(response.status).toBe(404);
        done();
      });
  });

  it("pass a non-existing file name", (done) => {
    request
      .get("/api/images?fileName=pig-1&width=200&height=200")
      .then((response) => {
        expect(response.status).toBe(500);
        done();
      });
  });
});
