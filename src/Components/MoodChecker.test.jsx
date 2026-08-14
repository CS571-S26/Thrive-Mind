import { describe, it, expect, beforeEach } from "vitest";
import { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MoodChecker from "./MoodChecker";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Each question always renders its 4 options in score order (1st = score 1,
// ..., 4th = score 4), so picking by position is enough to drive the quiz.
const answerQuiz = async (scores) => {
  for (const score of scores) {
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[score - 1]);
    await act(async () => {
      await wait(350);
    });
  }
};

const renderQuiz = () =>
  render(
    <MemoryRouter>
      <MoodChecker />
    </MemoryRouter>
  );

beforeEach(() => {
  localStorage.clear();
});

describe("MoodChecker quiz completion", () => {
  it("walks through all 5 questions and shows a result screen", async () => {
    renderQuiz();

    await answerQuiz([3, 3, 3, 3, 3]);

    expect(screen.getByText("Retake Quiz")).toBeInTheDocument();
    expect(screen.getByText("Your check-in")).toBeInTheDocument();
  });

  it("shows the struggling-tier result at the low-score boundary", async () => {
    renderQuiz();

    // scores [1,1,1,2,2] sum to 7 out of a max of 20 -> exactly 35%
    await answerQuiz([1, 1, 1, 2, 2]);

    expect(
      screen.getByText("You may be having a difficult day")
    ).toBeInTheDocument();
  });

  it("persists a mood entry with category scores to localStorage", async () => {
    renderQuiz();

    await answerQuiz([4, 4, 1, 3, 3]); // low Sleep score

    const history = JSON.parse(
      localStorage.getItem("thrive_mind_mood_history")
    );

    expect(history).toHaveLength(1);
    expect(history[0].focusCategory).toBe("Sleep");
    expect(history[0].categoryScores).toHaveLength(5);
  });

  it("shows the biggest-focus-area callout matching the lowest category", async () => {
    renderQuiz();

    await answerQuiz([4, 4, 1, 3, 3]);

    const callout = screen.getByText(/biggest area to focus on today/i);
    expect(callout.closest("p")).toHaveTextContent("Sleep");
  });

  it("resets back to question 1 when Retake Quiz is clicked", async () => {
    renderQuiz();

    await answerQuiz([3, 3, 3, 3, 3]);
    fireEvent.click(screen.getByText("Retake Quiz"));

    expect(screen.getByText("Question 1 of 5")).toBeInTheDocument();
  });
});
