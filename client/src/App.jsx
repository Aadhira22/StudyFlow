import { useState } from "react";
import Home from "./components/Home";
import Flashcards from "./components/Flashcards";
import Quiz from "./components/Quiz";

function App() {
  const [screen, setScreen] = useState("home");
  const [studySet, setStudySet] = useState(null);

  return (
    <>
      {screen === "home" && (
        <Home
          setScreen={setScreen}
          setStudySet={setStudySet}
        />
      )}

      {screen === "flashcards" && (
        <Flashcards
          studySet={studySet}
          setScreen={setScreen}
        />
      )}

      {screen === "quiz" && (
        <Quiz
          studySet={studySet}
          setScreen={setScreen}
        />
      )}
    </>
  );
}

export default App;