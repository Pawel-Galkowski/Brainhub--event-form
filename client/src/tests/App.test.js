import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

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

    fireEvent.change(emailInput, { target: { value: "email@input.pl" } });
    expect(emailInput.value).toBe("email@input.pl");

    fireEvent.change(dateInput, { target: { value: "2020-08-20" } });
    expect(dateInput.value).toBe("2020-08-20");
  });
});

describe("submit button", () => {
  it("Trigger formSubmit", () => {

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

    // const mockCallBack = jest.fn();
    // fireEvent.click(getByTestId("send"));
    // expect(formSubmit(mockCallBack)).toHaveBeenCalled();

    // const button = shallow(<App onSubmit={mockCallBack}>Ok!</App>);
    // button.find('input[type="submit"]').simulate("click");
    // expect(mockCallBack.mock.calls.length).toEqual(1);

    // const wrapper = mount(<App onSubmit={onSubmitFn} />);
    // const form = wrapper.find("form");
    // form.simulate("submit");
    // expect(onSubmitFn).toHaveBeenCalledTimes(1);
  });
});

// describe("Test Alerts of redux", () => {
//   it("Renders alerts correctly", () => {
//     const { getByTestId } = render(
//       shallow(
//         <Provider store={store}>
//           <Alert alert={"Show perfectly"} />
//         </Provider>
//       ).exists(<h1>Test page</h1>)
//     );
//     expect(getByTestId("alerts")).toBe("Show perfectly");
//   });
// });

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