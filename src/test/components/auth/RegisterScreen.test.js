import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { RegisterScreen } from "../../../components/auth/RegisterScreen";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router-dom";
import { types } from "../../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  ui: {
    loading: false,
    msgError: null,
  },
};

let store = mockStore(initState);

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
);

describe("Pruebas en <RegisterScreen />", () => {
  test("debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de hacer el dispatch de la acción respectiva", () => {
    const nameField = wrapper.find('input[name="name"]');

    nameField.simulate("change", {
      target: {
        value: "Jonathan",
        name: "name",
      },
    });

    const emailField = wrapper.find('input[name="email"]');

    emailField.simulate("change", {
      target: {
        value: "",
        name: "email",
      },
    });

    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.uiSetError,
      payload: "Email is not valid",
    });
  });

  test("debe de mostrar la caja de alerta con el error", () => {
    const initState = {
      ui: {
        loading: false,
        msgError: "Email no es correcto",
      },
    };

    let store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find(".auth__alert-error").exists()).toBe(true);
    expect(wrapper.find(".auth__alert-error").text().trim()).toBe(
      initState.ui.msgError
    );
  });
});
