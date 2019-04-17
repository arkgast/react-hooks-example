import React from "react";

interface IProps {
  dispatch(obj: any): void;
}

const Filter: React.SFC<IProps> = ({ dispatch }) => {
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
