import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { JournalEntries } from "./JournalEntries";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import { startNewNotes } from "../../actions/notes";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  const handlerLogout = () => {
    dispatch(startLogout());
  };

  const handlerNewEntry = () => {
    dispatch(startNewNotes());
  };

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3 className="mt-5">
          <FontAwesomeIcon icon={["far", "moon"]} />
          <span className="space"> {name} </span>
        </h3>
        <button className="btn" onClick={handlerLogout}>
          Logout
        </button>
      </div>

      <div className="journal__new-entry" onClick={handlerNewEntry}>
        <FontAwesomeIcon icon={["far", "calendar-plus"]} size="5x" />
        <p className="mt-5">New entry</p>
      </div>
      <JournalEntries />
    </aside>
  );
};
