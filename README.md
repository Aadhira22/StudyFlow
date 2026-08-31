# StudyFlow

StudyFlow is an AI-powered study assistant that converts a topic or pasted study notes into an interactive set of flashcards and quiz questions.

The application uses Google's Gemini API to generate structured study material and provides an interactive interface for reviewing and testing knowledge.

## Demo

### Screen Recording

<!-- Uploading "2026-08-31 19-13-29.mp4"... -->

The recording demonstrates the main user flow, including study-set generation, flashcard interactions, quiz functionality, feedback, and results.

---

## Features

- Generate study material from a topic or pasted notes
- AI-generated flashcards
- Interactive flashcard flip animation
- Previous / Next flashcard navigation
- AI-generated multiple-choice quiz
- Instant correct/incorrect feedback
- Explanations for quiz answers
- Quiz score calculation
- Retry incorrect questions
- Loading state during AI generation
- Error handling
- Input validation
- Keyboard shortcut: `Ctrl + Enter` / `Cmd + Enter` to generate
- Responsive mobile-friendly UI
- Dark-themed interface

---

## Tech Stack

### Frontend

- React
- Vite
- CSS

### Backend

- Node.js
- Express.js
- CORS

### AI

- Google Gemini API
- `@google/genai` SDK

### Validation

- Zod

---

## Project Structure

```text
StudyFlow/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Flashcards.jsx
│   │   │   ├── Flashcard.jsx
│   │   │   ├── Quiz.jsx
│   │   │   └── QuizQuestion.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
│
├── server/
│   ├── gemini.js
│   ├── schema.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── package.json
├── package-lock.json
└── README.md
```

---

## Setup

### Prerequisites

- Node.js
- npm
- A Google Gemini API key

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd StudyFlow
```

### 2. Install dependencies

From the project root:

```bash
npm install
```

This installs the root dependency used to run the frontend and backend together.

### 3. Configure the Gemini API

Create a `.env` file inside the `server` directory:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Do not commit this file or expose the API key in the frontend.

### 4. Start the application

From the project root:

```bash
npm start
```

This starts both the frontend and backend.

The frontend will run on the Vite development URL shown in the terminal, and the backend runs on:

```text
http://localhost:5000
```

---

## Usage

1. Enter a topic such as `Photosynthesis`, or paste your study notes.
2. Click **Generate Study Set** or press `Ctrl + Enter` (`Cmd + Enter` on macOS).
3. Wait for the study material to be generated.
4. Review the generated flashcards.
5. Click the flashcard or **Flip** to reveal the answer.
6. Use **Previous** and **Next** to navigate between flashcards.
7. Switch to the **Quiz** tab.
8. Select an answer to receive immediate feedback.
9. View the explanation for the answer.
10. Complete the quiz to see the final score.
11. Use **Retry Incorrect** to practice questions answered incorrectly.
12. Generate a new study set whenever needed.

---

## How AI Generation Works

The frontend sends the user's topic or notes to the Express backend.

```text
User Input
    ↓
React Frontend
    ↓
Express Backend
    ↓
Google Gemini API
    ↓
Structured Study Material
    ↓
Zod Validation
    ↓
React Frontend
```

The backend uses the `@google/genai` SDK to communicate with Gemini.

Gemini is instructed to generate:

### Flashcards

- 6 flashcards
- A question for each flashcard
- An answer for each flashcard

### Quiz

- 5 multiple-choice questions
- 4 options per question
- Correct answer
- Explanation for the correct answer

The Gemini response is requested in JSON format and validated using Zod before being returned to the frontend.

---

## Why a Backend?

Although StudyFlow is primarily a frontend-focused project, a lightweight Express backend was added to handle the Gemini API securely.

The Gemini API key is kept on the server rather than being exposed to the browser.

The backend also provides a place to validate the AI-generated response with Zod before the data reaches the frontend.

---

## AI Usage

Gemini is used for educational content generation.

The application uses AI to generate the flashcards, quiz questions, answer options, correct answers, and explanations displayed to the user.

The application logic, frontend UI, API integration, response validation, flashcard interactions, quiz interactions, loading and error states, and overall user experience were implemented as part of the project.

AI-generated content may contain inaccuracies and should be reviewed before being used for important academic purposes.

---

## Loading, Error, and Empty States

The application handles the main asynchronous and invalid-input states:

### Empty State

The **Generate Study Set** button remains disabled when no topic or notes have been entered.

### Loading State

While Gemini is generating the study material:

- A loading indicator is displayed.
- The Generate button is disabled.
- Additional generation requests are prevented.

### Error State

If generation fails or the returned data cannot be validated, an error message is displayed with an option to retry.

---

## Validation

Study material returned from Gemini is validated using **Zod**.

The validation ensures that:

- Exactly 6 flashcards are returned.
- Each flashcard contains a question and answer.
- Exactly 5 quiz questions are returned.
- Each quiz question contains exactly 4 options.
- The correct answer is a valid option index.
- Required text fields are not empty.

Invalid responses are rejected instead of being passed directly to the frontend.

---

## Limitations

- AI-generated content may occasionally contain factual inaccuracies.
- Study material quality depends on the quality and specificity of the provided input.
- A valid Gemini API key is required.
- API availability and usage limits depend on the Gemini service and selected model.
- Study sets are not currently persisted to a database.
- There is currently no authentication or user account system.
- Generated answers should be verified before being used for important academic purposes.
- The application currently focuses on flashcards and multiple-choice quizzes.
- The application currently runs locally and is not deployed as a production application.

---

## Future Improvements

- Save and revisit previous study sets
- Study history and progress tracking
- Difficulty selection
- Custom flashcard and quiz counts
- Spaced repetition
- Authentication and user accounts
- Persistent study history
- More detailed learning analytics
- Improved AI-generated explanations
- Additional study formats
- Production deployment

---

## Time Spent

Approximately **4 hours** were spent designing, implementing, debugging, testing, and polishing the application.

Approximate breakdown:

| Area | Time |
|---|---:|
| UI / Frontend | ~1.5 hours |
| Backend / API Integration | ~1 hour |
| Gemini Integration | ~0.5 hour |
| Quiz & Flashcard Functionality | ~0.5 hour |
| Testing & Debugging | ~1 hour |
| **Total** | **~4.5 hours** |

---

## Security

The Gemini API key is stored in an environment variable on the backend and is not exposed directly to the frontend.

Never commit API keys or other secrets to the repository.

The `.env` file should remain local and should be included in `.gitignore`.
