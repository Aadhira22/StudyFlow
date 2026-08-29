function QuizQuestion({
  question,
  questionNumber,
  selectedAnswer,
  onSelect,
}) {
  return (
    <div
      className={`quiz-question ${
        selectedAnswer !== null
          ? selectedAnswer === question.answer
            ? "question-correct"
            : "question-incorrect"
          : ""
      }`}
    >
      <div className="question-title">
        <span className="question-number">
          {questionNumber}
        </span>

        <h2>{question.question}</h2>
      </div>

      <div className="quiz-options">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = question.answer === index;

          let className = "quiz-option";

          if (selectedAnswer !== null) {
            if (isCorrect) {
              className += " correct";
            } else if (isSelected) {
              className += " incorrect";
            }
          }

          return (
            <button
              key={index}
              className={className}
              onClick={() => onSelect(index)}
              disabled={selectedAnswer !== null}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}.
              </span>

              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {selectedAnswer !== null && (
        <div className="answer-explanation">
          {question.explanation}
        </div>
      )}
    </div>
  );
}

export default QuizQuestion;