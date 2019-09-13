import templates from "../apis/templates";
import history from "../history";
import {
  CREATE_TEMPLATE,
  FETCH_ALL_TEMPLATES,
  FETCH_SINGLE_TEMPLATE,
  USE_TEMPLATE,
  DELETE_TEMPLATE,
  EDIT_TEMPLATE
} from "./types";

export const createTemplate = (formValues) => {
  return async (dispatch) => {
    // dispatch aksiyon ve getState aksiyon olmalarında kaynaklı özllikler
    // getState sayesinde o anki state in icindekilere erisebiliyoruz
    const response = await templates.post("/templates", { ...formValues });

    dispatch({ type: CREATE_TEMPLATE, payload: response.data });
    //do some programmatic navigation to
    //get the user back to the root route
    history.push("/");
  };
};

export const sendMail = (mail) => {
  return async () => {
    await templates.post("/mail", mail);
    history.push("/");
  };
};

export const fetchAllTemplates = () => {
  return async (dispatch) => {
    const response = await templates.get("/templates");
    dispatch({ type: FETCH_ALL_TEMPLATES, payload: response.data });
  };
};

export const fetchSingleTemplate = (id) => {
  return async (dispatch) => {
    const response = await templates.get(`/templates/${id}`);
    dispatch({ type: FETCH_SINGLE_TEMPLATE, payload: response.data });
  };
};

export const editTemplate = (id, newValues) => {
  return async (dispatch) => {
    const response = await templates.patch(`/templates/${id}`, newValues);
    dispatch({ type: EDIT_TEMPLATE, payload: response.data });
    history.push("/");
  };
};

export const useTemplate = (id) => {
  return {
    type: USE_TEMPLATE,
    payload: id
  };
};

export const deleteTemplate = (id) => {
  return async (dispatch) => {
    await templates.delete(`/templates/${id}`);
    dispatch({ type: DELETE_TEMPLATE, payload: id });
  };
};
