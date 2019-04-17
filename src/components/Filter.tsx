import React, { useContext } from "react";

import DispatchContext from "../context";

const Filter: React.SFC = () => {
  const dispatch = useContext(DispatchContext);

  const handleShowAll = () => {
    dispatch({ type: "SHOW_ALL" });
  };

  const handleShowComplete = () => {
    dispatch({ type: "SHOW_COMPLETE" });
  };

  const handleShowIncomplete = () => {
    dispatch({ type: "SHOW_INCOMPLETE" });
  };

  return (
    <div>
      <button onClick={handleShowAll}>Show All</button>
      <button onClick={handleShowComplete}>Show Complete</button>
      <button onClick={handleShowIncomplete}>Show Incomplete</button>
    </div>
  );
};

export default Filter;
