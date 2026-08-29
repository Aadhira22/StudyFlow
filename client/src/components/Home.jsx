import { useState } from "react";
import Navbar from "./Navbar";
import { generateStudyMaterial } from "../services/api";

function Home({ setScreen, setStudySet }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleGenerate = async () => {
    if (!input.trim() || loading) {
        return;
    }

    try {
        setLoading(true);

        const result = await generateStudyMaterial(input);

        setStudySet(result);
        setScreen("flashcards");
    } catch (error) {
        console.error("Generation failed:", error);
    } finally {
        setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (
        event.key === "Enter" &&
        (event.ctrlKey || event.metaKey)
    ) {
        event.preventDefault();

        if (input.trim()) {
        handleGenerate();
        }
    }
};
  return (
    <div className="app">
      <Navbar />

      <main className="home">
        <section className="hero">
          <p className="eyebrow">STUDY SMARTER</p>

          <h1>
            Turn your notes into
            <br />
            <span>instant flashcards</span>
          </h1>

          <p className="subtitle">
            Paste your notes or enter a topic. StudyFlow generates
            structured flashcards and a quiz — ready to study in seconds.
          </p>
        </section>

        <section className="input-card">
          <textarea
            className="study-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a topic or paste your study notes here..."
          />

          <div className="examples">
            <p>Examples:</p>
            <p>— "The French Revolution"</p>
            <p>— "Mitosis and Meiosis"</p>
            <p>— Your own class notes</p>
          </div>

          <div className="input-footer">
            <span>⌘ + Enter to generate</span>

            <button
                className="generate-button"
                onClick={handleGenerate}
                disabled={!input.trim() || loading}
                >
                {loading
                    ? "Generating study set..."
                    : "Generate Study Set →"}
            </button>
          </div>
        </section>

        <section className="features">
          <div><span className="feature-icon">◇</span> 6 flashcards</div>
          <div><span className="feature-icon">◉</span> 5-question quiz</div>
          <div><span className="feature-icon">◎</span> Instant feedback</div>
        </section>
      </main>
    </div>
  );
}

export default Home;