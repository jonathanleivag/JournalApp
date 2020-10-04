import { login, logout, startLogin, startLogout } from "../../actions/auth";
import "@testing-library/jest-dom";
import { types } from "../../types/types";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe("Pruebas con las acciones de Auth", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });
  test("login y logout deben de crear la acción respectiva", () => {
    const uid = "1234";
    const displayName = "Jonathan";
    const loginAction = login(uid, displayName);
    expect(loginAction.type).toBe(types.login);
    expect(loginAction).toEqual({
      type: types.login,
      payload: { uid, displayName },
    });
    const logoutAction = logout();
    expect(logoutAction.type).toBe(types.logout);
  });

  test("debe de realizar el startLogout", async () => {
    await store.dispatch(startLogout());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.logout,
    });

    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning,
    });
  });

  test("debe de iniciar el startLoginEmailPassword", async () => {
    await store.dispatch(startLogin("johnny@johnny.com", "123456"));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: "EeIKR5mOFYbpn0yZ01jqgTzlDbB3",
        displayName: null,
      },
    });
  });
});
