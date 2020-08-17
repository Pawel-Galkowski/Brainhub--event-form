const request = require("supertest");
const app = require("./../server");
const Event = require("../models/Events");

describe("NodeJS API TESTS", () => {
  let testEmail = "a.serenada@ok.pl";

  afterAll(async () => {
    await request(app)
      .delete("/forms/removePerson")
      .send({
        email: testEmail,
      })
      .expect('"Person removed"')
      .expect(200);
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

  // The other way to remove
  //
  // test("Remove test person", async () => {
  //   await request(app)
  //     .delete("/forms/removePerson")
  //     .send({
  //       email: testEmail,
  //     })
  //     .expect('"Person removed"')
  //     .expect(200);
  // });
});
