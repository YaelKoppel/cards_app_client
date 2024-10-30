
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './components/card.js';

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:8080/cards');
        setCards(response.data);
      } catch (err) {
        console.error(err);
      } 
    };

    fetchCards();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/cards/${id}`);
      setCards(cards.filter(card => card.id !== id));
    } catch (error) {
      console.error('Failed to delete card:', error);
    }
  };

  const addCard = async () => {
    const newCard = {
      text: 'Enter your text here',
      color: 3,
    };
    try {
      const response = await axios.post('http://localhost:8080/cards', newCard);
      setCards([...cards, response.data]);
    } catch (err) {
      console.error('Failed to add card:', err);
    }
  };

  const updateCardText = async (id, text) => {
    try {
      const response = await axios.patch(`http://localhost:8080/cards/${id}`, { text });
      setCards(cards.map(card => (card.id === id ? response.data : card)));
    } catch (err) {
      console.error('Failed to update card text:', err);
    }
  };

  const updateCardColor = async (id, color) => {
    try {
      const response = await axios.patch(`http://localhost:8080/cards/${id}`, { color });
      setCards(cards.map(card => (card.id === id ? response.data : card)));
    } catch (err) {
      console.error('Failed to update card color:', err);
    }
  };

  return (
    <div className="App">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          handleDelete={handleDelete}
          updateCardText={updateCardText}
          updateCardColor={updateCardColor}
        />
      ))}
      <button onClick={addCard} className="add-button">
        <i className="fa fa-plus" aria-hidden="true"></i>
      </button>
    </div>
  );
}

export default App;
