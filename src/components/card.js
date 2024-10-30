// Card.js
import './card.css';
import React, { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';

function Card({ card, handleDelete, updateCardText, updateCardColor }) {
  const [editText, setEditText] = useState(card.text);
  const [editMode, setEditMode] = useState(false);
  const [visibleColorOptions, setVisibleColorOptions] = useState(false);

  const handleDoubleClick = () => {
    setEditMode(true);
  };

  const handleEditChange = (event) => {
    setEditText(event.target.value);
  };

  const handleBlur = () => {
    updateCardText(card.id, editText);
    setEditMode(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      updateCardText(card.id, editText);
      setEditMode(false);
    }
  };

  const toggleColorOptions = () => {
    setVisibleColorOptions(!visibleColorOptions);
  };

  return (
    <div
      className={`card ${card.color === 1 ? 'lightblue' : card.color === 2 ? 'lightgreen' : 'lightgray'}`}
      onDoubleClick={handleDoubleClick}
    >
      {editMode ? (
        <input
          type="text"
          value={editText}
          onChange={handleEditChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <h3>{card.text}</h3>
      )}
      <i
        className="fa fa-trash delete-icon"
        onClick={() => handleDelete(card.id)}
      ></i>

      <i
        className="fa fa-paint-brush color-icon"
        onClick={toggleColorOptions}
      ></i>

      {visibleColorOptions && (
        <div className="color-options">
          <span
            className="color-circle lightblue"
            onClick={() => updateCardColor(card.id, 1)}
          ></span>
          <span
            className="color-circle lightgreen"
            onClick={() => updateCardColor(card.id, 2)}
          ></span>
          <span
            className="color-circle lightgray"
            onClick={() => updateCardColor(card.id, 3)}
          ></span>
        </div>
      )}
    </div>
  );
}

export default Card;
