import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";
import { mount } from "enzyme";

test("React test", async () => {
  let testValue = null;
  expect(testValue).toBeNull();
});


describe("Render of components", () => {
  it("render correctly", () => {
    const { getByTestId, queryByPlaceholderText } = render(<App />);
    expect(queryByPlaceholderText("Name")).toBeTruthy();
    expect(queryByPlaceholderText("Surname")).toBeTruthy();
    expect(queryByPlaceholderText("Email")).toBeTruthy();
    expect(getByTestId("date")).toBeTruthy();
    expect(getByTestId("send")).toBeTruthy();
  });
});

describe("Test Input values", () => {
  it("updates on change", () => {
    const { queryByPlaceholderText, getByTestId } = render(<App />);

    const nameInput = queryByPlaceholderText("Name");
    const surnameInput = queryByPlaceholderText("Surname");
    const emailInput = queryByPlaceholderText("Email");
    const dateInput = getByTestId("date");

    fireEvent.change(nameInput, { target: { value: "inputTest" } });
    expect(nameInput.value).toBe("inputTest");

    fireEvent.change(surnameInput, { target: { value: "surnameInput" } });
    expect(surnameInput.value).toBe("surnameInput");

    fireEvent.change(emailInput, { target: { value: "email@input.pl" } });
    expect(emailInput.value).toBe("email@input.pl");

    fireEvent.change(dateInput, { target: { value: "2020-08-20" } });
    expect(dateInput.value).toBe("2020-08-20");
  });
});

describe("submit button", () => {
  it("Valid trigger formSubmit", () => {
    const wrapper = mount(<App />);
    const form = wrapper.find("form").first();

    const name = wrapper.find('input[name="name"]');
    name.instance().value = 'cerny';
    name.simulate('change', name);

    const surname = wrapper.find('input[name="surname"]');
    surname.instance().value = 'cerny';
    surname.simulate('change', surname);

    const email = wrapper.find('input[name="email"]');
    email.instance().value = 'email@input.pl';
    email.simulate('change', email);

    const date = wrapper.find('input[name="date"]');
    date.instance().value = '2020-08-20';
    date.simulate('change', date);

    form.simulate("submit");
    expect(wrapper).toBeTruthy();
  });

  it("Invalid formSubmit", () => {
    const wrapper = mount(<App />);
    const form = wrapper.find("form").first();

    const surname = wrapper.find('input[name="surname"]');
    surname.instance().value = 'cerny';
    surname.simulate('change', surname);

    const email = wrapper.find('input[name="email"]');
    email.instance().value = 'email@input.pl';
    email.simulate('change', email);

    const date = wrapper.find('input[name="date"]');
    date.instance().value = '2020-08-20';
    date.simulate('change', date);

    form.simulate("submit");
    expect(wrapper.find(".wrong-data").first().text()).toBe("Name cannot be blank");
  });
});

// describe("Test Api of react", () => {
//   let testEmail = "a.serenada@ok.pl";
//   // afterAll(async () => {
//   //   await Event.findOneAndRemove({ email: testEmail });
//   // });

//   it("React send Api is correct", async () => {
//     const objectData = {
//       name: "Alek",
//       surname: "Serenada",
//       email: testEmail,
//       date: "06-05-2025",
//     };
//     const sendEventForm = eventForm(objectData);
//     expect(sendEventForm).toBe('"Registration confirmed"');
//   });
// });
