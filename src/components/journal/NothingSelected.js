import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const NothingSelected = () => {
  return (
    <div className="nothing__main-content">
      <p>
        Select something <br /> pr create an entry
      </p>
      <FontAwesomeIcon icon={["far", "star"]} size="4x" className="mt-5" />
    </div>
  );
};
