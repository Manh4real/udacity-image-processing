import express from "express";
import supertest from "supertest";
import { app } from "../../src";

const request = supertest(app);

// describe("Test functionality", () => {
//   it("should transform image properly", (done) => {
//     request
//       .get("/api/images?fileName=pic-1&width=200&height=200")
//       .then((response) => {
//         response.body;
//       });
//   });
// });
