const request = require("supertest");
const should = require("should");
const app = require("../../index.js");

describe("GET /users는----------------------", () => {
  describe("성공시", () => {
    it("유저객체를 담은 배열로 응답한다.", (done) => {
      // 서버 코드는 비동기 코드 이기 때문에 done 이라는 콜백 함수를 넣어줌
      request(app)
        .get("/users")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done(); // 입력.
        });
    });
    it("최대 limit 갯수 만큼 응답한다.", (done) => {
      request(app)
        .get("/users?limit=2")
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done(); // 입력.
        });
    });
  });
  describe("실패시", () => {
    it("limit 이 숫자형이 아니면 400을 응답.", (done) => {
      request(app).get("/users?limit=two").expect(400).end(done);
    });
  });
});

describe("GET /users/:id는----------------------", () => {
  describe("성공시", () => {
    it("id가 1인 유저 객체를 반환한다", (done) => {
      request(app)
        .get("/users/1")
        .end((err, res) => {
          res.body.should.have.property("id", 1);
          done();
        });
    });
    describe("실패시", () => {
      it("id 가 숫자가 아닐 경우 400으로 응답.", (done) => {
        request(app).get("/users/one").expect(400).end(done);
      });
      it("id 로 유저를 찾을 수 없을 경우 404로 응답한다.", (done) => {
        request(app).get("/users/999").expect(404).end(done);
      });
    });
  });
});

describe("DELETE /users/:id는----------------------", () => {
  describe("성공시", () => {
    it("204를 응답한다", (done) => {
      request(app).delete("/users/1").expect(204).end(done);
    });
  });
  describe("실패시", () => {
    it("id 가 숫자가 아닐경우 400 으로 응답.", (done) => {
      request(app).delete("/users/one").expect(400).end(done);
    });
  });
});

describe("POST /users는----------------------", () => {
  describe("성공시", () => {
    let name = "chocho",
      body;
    before((done) => {
      // 이 비포어는 테스트 케이스가 동작 하기 전에 미리 실행되는 함수
      request(app)
        .post("/users")
        .send({ name })
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });
    it("생성된 유저 객체를 반환한다.", () => {
      body.should.have.property("id");
    });
    it("입력한 name 을 반환한다.", () => {
      body.should.have.property("name", name);
    });
  });
  describe("실패시", () => {
    it("name 파라미터 누락시 400 을 반환한다.", (done) => {
      request(app).post("/users").send({}).expect(400).end(done);
    });
    it("name 이 중복일 경우 409를 반환한다.", (done) => {
      request(app)
        .post("/users")
        .send({ name: "chocho" })
        .expect(409)
        .end(done);
    });
  });
});

describe("PUT /users/:id는----------------------", () => {
  describe("성공시", () => {
    it("변경된 name 을 응답한다.", (done) => {
      const name = "Kimchi";
      request(app)
        .put("/users/3")
        .send({ name })
        .end((err, res) => {
          res.body.should.have.property("name", name);
          done();
        });
    });
    describe("실패시", () => {
      it("정수가 아닌 id 일 경우 400 응답.", (done) => {
        request(app).put("/users/three").expect(400).end(done);
      });
      it("name 이 없을 경우 400 응답", (done) => {
        request(app).put("/users/3").send({}).expect(400).end(done);
      });
      it("없는 유저일 경우 404 응답.", (done) => {
        request(app).put("/users/999").send({name: "JJangGu"}).expect(404).end(done);
      });
      it("중복된 이름일 경우 409응답", (done) => {
        request(app)
          .put("/users/2")
          .send({ name: "Jinwoo" })
          .expect(409)
          .end(done);
      });
    });
  });
});
