import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeNote, startDelete } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import { NoteAppBar } from "./NoteAppBar";

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);

  const [values, handleInputChange, reset] = useForm(note);
  const { title, body } = values;

  const { url } = note;

  const refNoteId = useRef(note.id);

  const dispatch = useDispatch();

  useEffect(() => {
    if (refNoteId.current !== note.id) {
      reset(note);
      refNoteId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(values.id, { ...values }));
  }, [values, dispatch]);

  const handlerDelete = () => {
    dispatch(startDelete(refNoteId));
  };

  return (
    <div className="notes__main-content">
      <NoteAppBar />
      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          name="title"
          autoComplete="off"
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          placeholder="What happened today"
          className="notes__textarea"
          autoComplete="off"
          name="body"
          value={body}
          onChange={handleInputChange}
        ></textarea>

        {url && (
          <div className="notes__image">
            <img src={url} alt="Imagen" />
          </div>
        )}
      </div>
      <button className="btn btn-danger" onClick={handlerDelete}>
        Delete
      </button>
    </div>
  );
};
