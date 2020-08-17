import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { eventForm } from "../../actions/forms";
import Alert from "../layout/Alert";

const EventForm = ({ eventForm }) => {
  const today = new Date().toISOString().substring(0, 10);
  const eventName = "Brainhub Event";
  const eventSubject = "Register confirmation";

  const [formData, setFormData] = useState({
    name: "",
    nameError: "",
    surname: "",
    surnameError: "",
    email: "",
    emailError: "",
    date: "",
    dateError: "",
    formName: eventName,
    subject: eventSubject,
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let nameError = "";
    let emailError = "";
    let surnameError = "";
    let dateError = "";

    if (!formData.name || formData.name.length < 2) {
      nameError = "Name cannot be blank";
    }

    if (!formData.surname) {
      surnameError = "Surname cannot be blank";
    }

    // eslint-disable-next-line
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      emailError = "Email is not valid";
    }

    if (!formData.date) {
      dateError = "Date cannot be blank";
    }

    if (nameError || surnameError || emailError || dateError) {
      setFormData({
        ...formData,
        nameError,
        surnameError,
        emailError,
        dateError,
      });
      return false;
    }

    return true;
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      eventForm(formData);
      setFormData({});
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  return (
    <div className="fullSide">
      <div className="main-container">
        <section className="formTemplate">
          <article>
            <div className="headerText">
              <h3>{eventName}</h3>
              <h1>Let's register to next event!</h1>
            </div>
            <form className="mainForm" onSubmit={formSubmit}>
              <div className="double-box">
                <div className="inline-box">
                  <label htmlFor="name">First name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={onChange}
                    required
                  />
                  <div className="wrong-data">
                    {formData.nameError}
                  </div>
                </div>
                <div className="inline-box">
                  <label htmlFor="surname">Last name</label>
                  <input
                    type="text"
                    placeholder="Surname"
                    name="surname"
                    onChange={onChange}
                    required
                  />
                  <div className="wrong-data">
                    {formData.surnameError}
                  </div>
                </div>
              </div>
              <label htmlFor="email">E-mail Adress</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={onChange}
                required
              />
              <div className="wrong-data">
                {formData.emailError}
              </div>
              <label htmlFor="date">Event date</label>
              <input
                data-testid="date"
                type="date"
                name="date"
                min={today}
                max="2099-12-31"
                onChange={onChange}
                required
              />
              <div className="wrong-data">
                {formData.dateError}
              </div>
              <Alert />
              <input
                id="submit"
                data-testid="send"
                type="submit"
                value="Send"
              />
            </form>
          </article>
        </section>
      </div>
    </div>
  );
};

EventForm.propTypes = {
  eventForm: PropTypes.func.isRequired,
};

export default connect(null, { eventForm })(EventForm);
