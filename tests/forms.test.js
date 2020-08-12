const request = require("supertest");
const app = require("./../server");
const Event = require("../models/Events");

describe("NodeJS API TESTS", () => {
  let testEmail = "a.serenada@ok.pl";
  
  afterAll(async () => {
    await Event.findOneAndRemove({ email: testEmail });
  });

  test("test eventForm", async () => {
    await request(app)
      .post("/forms/eventForm")
      .send({
        name: "Alek",
        surname: "Serenada",
        email: testEmail,
        date: "06-05-2025",
      })
      .expect(200);
  });
});
