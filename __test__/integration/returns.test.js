const request = require("supertest");
const mongoose = require("mongoose");
const Rental = require("../../models/rental");
const User = require("../../models/user");
describe("/api/returns", () => {
  let server;
  let customerId;
  let rental;
  let payload;
  const exec = async () => {
    return request(server).post("/api/returns").send(payload);
  };

  beforeEach(async () => {
    server = require("../../index");
    customerId = new mongoose.Types.ObjectId();
    movieId = new mongoose.Types.ObjectId();
    payload = { customerId, movieId };

    rental = new Rental({
      customer: {
        _id: customerId,
        name: "JohnDoe",
        phone: 123456,
      },
      movie: {
        _id: movieId,
        title: "movie title",
        dailyRentalRate: 2,
      },
    });
    await rental.save();
  });

  afterEach(async () => {
    await server.close();
    await Rental.deleteMany({});
  });
  it("should work", async () => {
    const result = await Rental.findById(rental._id);
    expect(result).not.toBeNull();
  });
  it("should return 401 if  client is not logged in", async () => {
    const response = await exec();
    expect(response.status).toBe(401);
  });
  it("should return 404 if  customerId is not provided", async () => {
    delete payload.customerId;
    const response = await exec();
    expect(response.status).toBe(400);
  });
  it("should return 404 if  movieId is not provided", async () => {
    delete payload.movieId;
    const response = await exec();
    expect(response.status).toBe(400);
  });
  // it("should return 404 if rental is not provided for customer/movie", async () => {
  //   await Rental.deleteMany({});
  //   const response = await exec();
  //   expect(response.status).toBe(404);
  // });
});
