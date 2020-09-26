import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { JournalEntries } from "./JournalEntries";
import { useDispatch } from "react-redux";
import { startLogout } from "../../actions/auth";

export const Sidebar = () => {
  const dispatch = useDispatch();

  const handlerLogout = () => {
    dispatch(startLogout());
  };

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3 className="mt-5">
          <FontAwesomeIcon icon={["far", "moon"]} />
          <span className="space">Jonathan</span>
        </h3>
        <button className="btn" onClick={handlerLogout}>
          Logout
        </button>
      </div>

      <div className="journal__new-entry">
        <FontAwesomeIcon icon={["far", "calendar-plus"]} size="5x" />
        <p className="mt-5">New entry</p>
      </div>
      <JournalEntries />
    </aside>
  );
};
