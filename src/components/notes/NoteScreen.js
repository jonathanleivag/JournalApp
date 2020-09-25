import React from "react";
import { NoteAppBar } from "./NoteAppBar";

export const NoteScreen = () => {
  return (
    <div className="notes__main-content">
      <NoteAppBar />
      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
        />
        <textarea
          placeholder="What happened today"
          className="notes__textarea"
          autoComplete="off"
        ></textarea>

        <div className="notes__image">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQYtfZRhbGQtq2BapB2MXJfWIO2QriO5Wx3qQ&usqp=CAU"
            alt="Imagen"
          />
        </div>
      </div>
    </div>
  );
};
