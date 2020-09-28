import { db } from "../firebase/firebaseConfig";

export const loadNotes = async (uid) => {
  const notesSnap = await db.collection(`${uid}/journal/notes`).get();
  const note = [];
  notesSnap.forEach((noteSnap) =>
    note.push({ id: noteSnap.id, ...noteSnap.data() })
  );
  return note;
};
