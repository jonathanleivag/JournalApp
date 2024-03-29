import { db } from "../firebase/firebaseConfig";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";

export const startNewNotes = () => {
  return async (dispatch, getState) => {
    const {
      auth: { uid },
    } = getState();

    const newNote = { title: "", body: "", date: new Date().getTime() };

    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
    dispatch(activeNote(doc.id, newNote));
    dispatch(addNewNote(doc.id, newNote));
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: { id, ...note },
});

export const setNotes = (notes) => ({ type: types.notesLoad, payload: notes });

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!note.url) delete note.url;
    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
    dispatch(refreshNote(note.id, noteToFirestore));
    Swal.fire("Saved", note.title, "success");
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: { id, note: { id, ...note } },
});

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;
    Swal.fire({
      title: "Uploading...",
      text: "Please wait...",
      allowOutsideClick: false,
      willOpen: () => Swal.showLoading(),
    });
    const fileUrl = await fileUpload(file);
    activeNote.url = fileUrl;
    dispatch(startSaveNote(activeNote));
    Swal.close();
  };
};

export const startDelete = (id) => {
  return (dispatch, getState) => {
    const {
      auth: { uid },
    } = getState();

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await db.doc(`${uid}/journal/notes/${id.current}`).delete();
          dispatch(deleteNote(id));
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } catch (error) {
          console.error(error);
        }
      }
    });
  };
};

export const deleteNote = (id) => ({ type: types.notesDelete, payload: id });

export const noteLogout = () => ({ type: types.notesLogoutCleaning });

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: { id, ...note },
});
