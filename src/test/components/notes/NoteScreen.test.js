import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { NoteScreen } from "../../../components/notes/NoteScreen";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { activeNote } from "../../../actions/notes";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: "epzyh6acV6bvzK60qwGony1xC0t2",
    name: "Johnny Leiva Gómez",
  },
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    notes: [
      {
        id: "8Xc6u3bqWoplmT5a15ts",
        title: "",
        body: "",
        date: 1601788561952,
      },
    ],
    active: {
      id: "8Xc6u3bqWoplmT5a15ts",
      date: 1601788561952,
      title: "Hola que tal",
      body: "hola que tal",
    },
  },
};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <NoteScreen />
  </Provider>
);

jest.mock("../../../actions/notes", () => ({
  activeNote: jest.fn(),
}));

describe("Pruebas en <NoteScreen />", () => {
  test("debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de disparar el active note", () => {
    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "hola que tal",
      },
    });

    expect(activeNote).toHaveBeenLastCalledWith('8Xc6u3bqWoplmT5a15ts', {
      body: "hola que tal",
      title: "hola que tal",
      id: '8Xc6u3bqWoplmT5a15ts',
      date: 1601788561952,
    });
  });
});
