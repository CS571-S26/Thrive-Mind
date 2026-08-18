import { describe, it, beforeEach } from "vitest";
import { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MoodChecker from "./MoodChecker";
import { runAxe } from "../test/axeHelper";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const answerQuiz = async (scores) => {
  for (const score of scores) {
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[score - 1]);
    await act(async () => {
      await wait(350);
    });
  }
};

beforeEach(() => {
  localStorage.clear();
});

describe("MoodChecker accessibility", () => {
  it("has no axe violations on the question screen", async () => {
    const { container } = render(
      <MemoryRouter>
        <MoodChecker />
      </MemoryRouter>
    );

    await runAxe(container);
  });

  it("has no axe violations on the results screen", async () => {
    const { container } = render(
      <MemoryRouter>
        <MoodChecker />
      </MemoryRouter>
    );

    await answerQuiz([3, 3, 3, 3, 3]);

    await runAxe(container);
  });
});
