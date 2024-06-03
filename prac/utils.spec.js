const utils = require("./utils.js");
const should = require("should");

describe("utils.js 모듈의 capitalize 함수는", () => {
  it("문자열의 첫번째 문자열을 대문자로 변환", () => {
    const result = utils.capitalize("hello");
    result.should.be.equal("Hello");
  });
});
