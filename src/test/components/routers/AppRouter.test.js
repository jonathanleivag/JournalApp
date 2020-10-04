import "@testing-library/jest-dom";
import { mount } from "enzyme";
import React from "react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router-dom";
import { login } from "../../../actions/auth";
import { AppRouter } from "../../../components/routers/AppRouter";
import { act } from "react-dom/test-utils";
import { firebase } from "../../../firebase/firebaseConfig";
import "../../../style/index";

jest.mock("../../../actions/auth", () => ({
  login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: {
      id: "ABC",
    },
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe("Pruebas en <AppRouter />", () => {
  test("debe de llamar el login si estoy autenticado", async () => {
    let user;
    await act(async () => {
      const userCred = await firebase
        .auth()
        .signInWithEmailAndPassword("johnny@johnny.com", "123456");
      user = userCred.user;
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });
    expect(login).toHaveBeenCalledWith("EeIKR5mOFYbpn0yZ01jqgTzlDbB3", null);
  });
});
