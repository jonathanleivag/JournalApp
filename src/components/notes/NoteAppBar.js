import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploading } from "../../actions/notes";

// react-journal

// https://api.cloudinary.com/v1_1/dmjxpnr5g

export const NoteAppBar = () => {
  const { active } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const handlerSave = () => {
    dispatch(startSaveNote(active));
  };

  const style = { display: "none" };

  const ref = useRef();

  const handlerPictureClick = () => ref.current.click();

  const handlerChangePicture = () => {
    const file = ref.current.files[0];
    if (file) dispatch(startUploading(file));
  };

  return (
    <div className="notes__appbar">
      <span>28 de Agosto 2020</span>

      <input
        type="file"
        id="file"
        style={style}
        onChange={handlerChangePicture}
        ref={ref}
        accept="image/*"
      />

      <div>
        <button className="btn" onClick={handlerPictureClick}>
          Picture
        </button>
        <button className="btn" onClick={handlerSave}>
          Save
        </button>
      </div>
    </div>
  );
};
