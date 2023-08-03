import React from "react";
import Popup from "reactjs-popup";

export default function Tip(props) {
  return (
    <div style={props.style}>
      <Popup
        trigger={(open) => (
        <span className="text">...</span>
        )}
        position="right center"
        on="hover"
        closeOnDocumentClick
      >
        <span>
          <span className="tooltip-content"> {props.data}</span>
        </span>
      </Popup>
    </div>
  );
}
