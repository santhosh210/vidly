const request = require("supertest");
const User = require("../../models/user");
const Genre = require("../../models/genre");

describe("auth middleware", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    await server.close();
    await Genre.deleteMany({});
  });
  let token;
  const exec = () => {
    return request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name: "genreTest" });
  };

  beforeEach(() => {
    token = new User().generateAuthToken();
  });
  it("Should return 401 if no token is provoded", async () => {
    token = " ";
    const res = await exec();
    expect(res.status).toBe(401);
  });
  it("Should return 401 if no token is provoded", async () => {
    token = null; //when we set token null is converted into string
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it("Should return 401 if no token is provoded", async () => {
    token = "abc";
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it("Should return 201 if token is valid", async () => {
    const res = await exec(); //200 in video
    expect(res.status).toBe(201);
  });
});
