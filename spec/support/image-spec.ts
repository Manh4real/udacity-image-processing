import { transformFile } from "../../src/util/file";

describe("Test functionality", () => {
  it("should transform image properly", (done) => {
    transformFile("pic-1", 200, 200).then((transformedFileName) => {
      expect(transformedFileName).toContain("pic-1-200x200.jpg");
      done();
    });
  });
});
