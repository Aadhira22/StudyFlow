function Flashcard({ card, isFlipped, onFlip }) {
  return (
    <div className="flashcard-container" onClick={onFlip}>
      <div className={`flashcard ${isFlipped ? "flipped" : ""}`}>
        
        {/* Front */}
        <div className="flashcard-face flashcard-front">
          <span className="card-label">QUESTION</span>

          <h2>{card.question}</h2>

          <p>Click to reveal answer</p>
        </div>

        {/* Back */}
        <div className="flashcard-face flashcard-back">
          <span className="card-label">ANSWER</span>

          <h2>{card.answer}</h2>

          <p>Click to see question</p>
        </div>

      </div>
    </div>
  );
}

export default Flashcard;