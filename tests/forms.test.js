const request = require("supertest");
const app = require("./../server");
const Event = require("../models/Events");

describe("NodeJS API TESTS", () => {
  let testEmail = "a.serenada@ok.pl";

  describe("Remove test database", () => {
    afterAll(async () => {
      await Event.findOneAndRemove({ email: testEmail });
    });
  });

  test("Post eventForm data", async () => {
    await request(app)
      .post("/forms/eventForm")
      .send({
        name: "Alek",
        surname: "Serenada",
        email: testEmail,
        date: "06-05-2025",
      })
      .expect('"Registration confirmed"')
      .expect(200);
  });

  test("Get random person from db", async () => {
    await request(app).get("/forms/persons").expect(200);
  });
});
