import React from "react";
import "./styles.css";

const Card = ({ index, isVisible }) => {
  return (
    <div className="card">
      {isVisible ? (
        <div className="card-content">
          <img
            src={`https://picsum.photos/300/200?random=${index}`}
            alt={`Card ${index + 1}`}
            className="card-image"
          />
          <div className="card-text">Card {index + 1} Loaded</div>
        </div>
      ) : (
        <div className="card-placeholder">
          <div className="card-loader"></div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Card);