import { useState } from "react";
import Navbar from "./Navbar";
import Flashcard from "./Flashcard";

function Flashcards({ studySet, setScreen }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const cards = studySet.flashcards;
  const currentCard = cards[currentIndex];

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const previousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  return (
    <div className="app">
      <Navbar />

      <main className="study-page">

        <div className="study-header">
          <div>
            <p className="eyebrow">STUDY SET</p>

            <h1>Flashcards</h1>
          </div>

          <button
            className="new-set-button"
            onClick={() => setScreen("home")}
          >
            + New study set
          </button>
        </div>

        <div className="tabs">
          <button className="active-tab">
            Flashcards ({cards.length})
          </button>

          <button onClick={() => setScreen("quiz")}>
            Quiz ({studySet.quiz.length})
          </button>
        </div>

        <div className="card-progress">
          <span>
            {currentIndex + 1} / {cards.length}
          </span>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${((currentIndex + 1) / cards.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <Flashcard
          card={currentCard}
          isFlipped={isFlipped}
          onFlip={() => setIsFlipped(!isFlipped)}
        />

        <div className="flashcard-controls">
          <button
            onClick={previousCard}
            disabled={currentIndex === 0}
          >
            ← Previous
          </button>

          <button
            className="flip-button"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            ↻ Flip
          </button>

          <button
            onClick={nextCard}
            disabled={currentIndex === cards.length - 1}
          >
            Next →
          </button>
        </div>

      </main>
    </div>
  );
}

export default Flashcards;