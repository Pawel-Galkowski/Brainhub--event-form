import axios from "axios";
import { setAlert } from "./alert";
import {
  FORM_ERROR,
  FORM_SEND,
  PERSON_REMOVED,
  REMOVED_ERROR,
} from "./types";

export const eventForm = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/forms/EventForm", formData, config);

    dispatch({
      type: FORM_SEND,
      payload: res.data,
    });

    dispatch(setAlert("Message send", "success"));
  } catch (err) {
    dispatch({
      type: FORM_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const removePerson = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/forms/removePerson", formData, config);

    dispatch({
      type: PERSON_REMOVED,
      payload: res.data,
    });

    dispatch(setAlert("Message send", "success"));
  } catch (err) {
    dispatch({
      type: REMOVED_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};