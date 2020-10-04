import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { Sidebar } from "../../../components/journal/Sidebar";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "../../../style/index";
import { startLogout } from "../../../actions/auth";
import { startNewNotes } from "../../../actions/notes";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock("../../../actions/auth", () => ({
  startLogout: jest.fn(),
}));

jest.mock('../../../actions/notes', () => ({
    startNewNotes: jest.fn(),
}));


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
const wrapper = mount(
  <Provider store={store}>
    <Sidebar />
  </Provider>
);

describe("Pruebas en <Sidebar />", () => {
  test("debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de llamar el startLogout", () => {
    wrapper.find("button").prop("onClick")();
    expect(startLogout).toHaveBeenCalled();
  });

  test('debe de llamar el startNewNote', () => {
    wrapper.find('.journal__new-entry').prop('onClick')();
    expect( startNewNotes ).toHaveBeenCalled();
  })

});
