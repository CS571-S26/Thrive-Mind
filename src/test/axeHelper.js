import axe from "axe-core";

// jsdom has no real layout/paint engine, so axe's color-contrast rule can't
// be evaluated reliably here — that's covered separately by the manual
// contrast audit (computed against the actual palette values in index.css).
const RULES_UNRELIABLE_UNDER_JSDOM = {
  "color-contrast": { enabled: false }
};

export const runAxe = async (container) => {
  const results = await axe.run(container, { rules: RULES_UNRELIABLE_UNDER_JSDOM });

  if (results.violations.length > 0) {
    const summary = results.violations
      .map((violation) => {
        const targets = violation.nodes
          .map((node) => `    ${node.target.join(" ")}`)
          .join("\n");
        return `${violation.id} (${violation.impact}): ${violation.help}\n${targets}`;
      })
      .join("\n\n");

    throw new Error(`Accessibility violations found:\n\n${summary}`);
  }
};
