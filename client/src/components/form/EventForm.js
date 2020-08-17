import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { eventForm } from "../../actions/forms";
import Alert from "../layout/Alert";

const EventForm = ({ eventForm }) => {
  const [formData, setFormData] = useState({});

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /*eslint-disable */
  useEffect(() => {
    setFormData({ ...formData, formName: eventName, subject: eventSubject });
  }, []);
  /*eslint-enable */

  const formSubmit = (e) => {
    e.preventDefault();
    eventForm(formData);
    setFormData({});
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const today = new Date().toISOString().substring(0, 10);
  const eventName = "Brainhub Event";
  const eventSubject = "Register confirmation";

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
                    id="name"
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="inline-box">
                  <label htmlFor="surname">Last name</label>
                  <input
                    id="surname"
                    type="text"
                    placeholder="Surname"
                    name="surname"
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <label htmlFor="email">E-mail Adress</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                onChange={onChange}
                required
              />
              <label htmlFor="date">Event date</label>
              <input
                id="date"
                data-testid="date"
                type="date"
                name="date"
                min={today}
                max="2099-12-31"
                onChange={onChange}
                required
              />
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
