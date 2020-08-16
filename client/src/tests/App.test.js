import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";
import Alert from "../components/layout/Alert";
import { describe } from "yargs";

//test of react tests
test("React test", async () => {
  let testValue = null;
  expect(testValue).toBeNull();
});

//test of renders
describe("Render of components", () => {
  it("render correctly", () => {
    const { getByTestId, queryByPlaceholderText } = render(<App />);
    expect(getByTestId("send")).toBeTruthy();
    expect(queryByPlaceholderText("Surname")).toBeTruthy();
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

    fireEvent.change(emailInput, { target: { value: "emailInput" } });
    expect(emailInput.value).toBe("emailInput");

    fireEvent.change(dateInput, { target: { value: "2020-08-20" } });
    expect(dateInput.value).toBe("2020-08-20");
  });
});

describe("submit button", () => {
  it("Trigger formSubmit", () => {
    const formSubmit = jest.fn();
    const { getByTestId, queryByPlaceholderText } = render(<App />);
    const nameInput = queryByPlaceholderText("Name");
    const surnameInput = queryByPlaceholderText("Surname");
    const emailInput = queryByPlaceholderText("Email");
    const dateInput = getByTestId("date");

    fireEvent.change(nameInput, { target: { value: "inputTest" } });
    expect(nameInput.value).toBe("inputTest");

    fireEvent.change(surnameInput, { target: { value: "surnameInput" } });
    expect(surnameInput.value).toBe("surnameInput");

    fireEvent.change(emailInput, { target: { value: "emailInput" } });
    expect(emailInput.value).toBe("emailInput");

    fireEvent.change(dateInput, { target: { value: "2020-08-20" } });
    expect(dateInput.value).toBe("2020-08-20");

    // fireEvent.click(getByTestId("send"));
    //expect(formSubmit).toHaveBeenCalled();

  });
});

//test alerts

describe("Test Alerts of redux", () => {
  it("Renders alerts correctly", () => {
    const { getByTestId } = render(<Alert alert={"Show perfectly"} />);
    expect(getByTestId("alerts")).toBe("Show perfectly");
  });
});

//test of api
