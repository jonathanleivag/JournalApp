import React from "react";

export const JournalEntry = () => {
  const style = {
    backgroundSize: "cover",
    backgroundImage:
      "url(https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg)",
  };

  return (
    <div className="journal__entry pointer">
      <div className="journal__entry-picture" style={style}></div>
      <div className="journal__entry-body">
        <p className="journal__entry-title">Lorem Ipsum</p>
        <p className="journal__entry-content">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>

      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>26</h4>
      </div>
    </div>
  );
};
