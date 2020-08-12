const { eventForm } = require("./forms");

describe("REACT API TESTS", () => {
  let testEmail = "a.serenada@ok.pl";

  afterAll(async () => {
    await Event.findOneAndRemove({ email: testEmail });
  });

  let data = {
    name: "Alek",
    surname: "Serenada",
    email: testEmail,
    date: "06-05-2025",
  };

  test("test eventForm", async () => {
    await eventForm(data).expect(200);
  });
});
