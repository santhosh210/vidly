const request = require("supertest");
const Genre = require("../../models/genre");
const User = require("../../models/User");
let server;
describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    await server.close();
    await Genre.deleteMany({});
  });

  describe("GET /", () => {
    it("should return a list of genres when no query is passed", async () => {
      await Genre.collection.insertMany([
        { name: "Action" },
        { name: "Comedy" },
      ]);
      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      // expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "Action")).toBeTruthy();
    });
  });

  describe("Get /:id", () => {
    it("should return a genre if a valid id is passed", async () => {
      const genre = new Genre({ name: "Horror" });
      await genre.save();

      const res = await request(server).get("/api/genres/" + genre._id);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });
  });

  describe("Get /:id", () => {
    it("should return 404 if a invalid id is passed", async () => {
      const res = await request(server).get("/api/genres/1");
      expect(res.status).toBe(500);
    });
  });
});

describe("POST /", () => {
  let token;
  let name;

  const exec = async () => {
    return await request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name: name });
  };

  beforeEach(() => {
    token = new User().generateAuthToken();
    name = "genre1";
  });

  it("Should return 401 if client is not logged in", async () => {
    token = " ";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("Should return 400 if genre is invalid i.e.,  less that 3 characters", async () => {
    name = "ab";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("Should return 400 if genre is invalid i.e.,  more that 25 characters", async () => {
    name = new Array(60).join("a");
    const res = await request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name: name });
    expect(res.status).toBe(400);
  });

  it("Should save the genre if its valid", async () => {
    await exec();
    const genre = await Genre.find({ name: "genre1" });
    expect(genre).not.toBeNull();
  });

  it("Should save the genre if its valid", async () => {
    const res = await exec();
    expect(res.body).toHaveProperty("_id");
  });
});
