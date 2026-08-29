import { useState } from "react";
import Navbar from "./Navbar";
import QuizQuestion from "./QuizQuestion";

function Quiz({ studySet, setScreen }) {
  const [questions, setQuestions] = useState(studySet.quiz);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);

    setAnswers((previousAnswers) => {
      const updatedAnswers = [...previousAnswers];
      updatedAnswers[currentIndex] = answerIndex;

      return updatedAnswers;
    });
  };

  const nextQuestion = () => {
    if (currentIndex === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentIndex((previousIndex) => previousIndex + 1);
    setSelectedAnswer(null);
  };

  const score = answers.reduce((total, answer, index) => {
    return total + (
      answer === questions[index].answer ? 1 : 0
    );
  }, 0);

  const retryIncorrect = () => {
    const incorrectQuestions = questions.filter(
      (question, index) =>
        answers[index] !== question.answer
    );

    setQuestions(incorrectQuestions);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setFinished(false);
  };

  // -------------------------
  // RESULTS SCREEN
  // -------------------------

  if (finished) {
    return (
      <div className="app">
        <Navbar />

        <main className="study-page">
          <div className="results-card">

            <p className="eyebrow">
              QUIZ COMPLETE
            </p>

            <h1>Your Results</h1>

            <div className="score">
              {score} / {questions.length}
            </div>

            <p className="score-message">
              {score === questions.length
                ? "Perfect score! 🎉"
                : "Keep practicing — you've got this!"}
            </p>

            <div className="results-actions">

              {score < questions.length && (
                <button
                  className="flip-button"
                  onClick={retryIncorrect}
                >
                  Retry Incorrect
                </button>
              )}

              <button
                className="new-set-button"
                onClick={() => setScreen("home")}
              >
                New Study Set
              </button>

            </div>

          </div>
        </main>
      </div>
    );
  }

  // -------------------------
  // QUIZ SCREEN
  // -------------------------

  return (
    <div className="app">

      <Navbar />

      <main className="study-page">

        <div className="study-header">

          <div>
            <p className="eyebrow">
              STUDY SET
            </p>

            <h1>Quiz</h1>
          </div>

          <button
            className="new-set-button"
            onClick={() => setScreen("home")}
          >
            + New study set
          </button>

        </div>

        <div className="tabs">

          <button
            onClick={() => setScreen("flashcards")}
          >
            Flashcards ({studySet.flashcards.length})
          </button>

          <button className="active-tab">
            Quiz ({questions.length})
          </button>

        </div>

        <div className="card-progress">

          <span>
            {currentIndex + 1} / {questions.length}
          </span>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${
                  ((currentIndex + 1) / questions.length) * 100
                }%`,
              }}
            />

          </div>

        </div>

        <QuizQuestion
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          selectedAnswer={selectedAnswer}
          onSelect={handleAnswer}
        />

        <div className="quiz-controls">

          <button
            className="flip-button"
            disabled={selectedAnswer === null}
            onClick={nextQuestion}
          >
            {currentIndex === questions.length - 1
              ? "Finish Quiz"
              : "Next Question →"}
          </button>

        </div>

      </main>

    </div>
  );
}

export default Quiz;