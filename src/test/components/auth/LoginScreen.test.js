import { mount } from "enzyme";
import { LoginScreen } from "../../../components/auth/LoginScreen";
import React from "react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router-dom";
import { startGoogleLogin, startLogin } from "../../../actions/auth";

jest.mock("../../../actions/auth", () => ({
  startGoogleLogin: jest.fn(),
  startLogin: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();
const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);

describe("Pruebas en <LoginScreen />", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de disparar la acción de startGoogleLogin", () => {
    wrapper.find(".google-btn").prop("onClick")();
    expect(startGoogleLogin).toHaveBeenCalled();
  });

  test("debe de disparar el startLogin con los respectivos argumentos", () => {
    wrapper.find("form").prop("onSubmit")({
      preventDefault() {},
    });

    expect(startLogin).toHaveBeenLastCalledWith("", "");
  });
});
