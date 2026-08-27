import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import Icon from "./Icon";

const LOCAL_STORAGE_KEYS = [
  "thrive_mind_mood_history",
  "thrive_mind_self_care_history",
  "thrive_mind_self_care_planner"
];
const SESSION_STORAGE_KEYS = ["thrive_mind_mood_quiz_progress"];

function Privacy() {
  const [cleared, setCleared] = useState(false);

  const handleClearData = () => {
    const confirmed = window.confirm(
      "This permanently deletes your mood history, self-care history, and in-progress quiz answers from this browser. This cannot be undone. Continue?"
    );
    if (!confirmed) return;

    LOCAL_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    SESSION_STORAGE_KEYS.forEach((key) => sessionStorage.removeItem(key));
    setCleared(true);
  };

  return (
    <Container className="mt-4">
      <div className="card-style">
        <h1 className="page-title">
          <Icon name="shield" size={28} /> Privacy & Safety
        </h1>

        <p style={{ color: "#4B5563", marginBottom: "24px" }}>
          Thrive Mind was built to be honest about what it does and doesn't
          do with your data, and about what it can and can't help with.
        </p>

        <div className="dashboard-panel mb-3">
          <h2 style={{ fontSize: "1.1rem", marginBottom: "10px" }}>
            What's stored, and where
          </h2>
          <p style={{ marginBottom: 0 }}>
            By default — without an account — your mood check-ins and
            self-care checklist history are stored only in this browser's{" "}
            <code>localStorage</code>. Nothing is sent to a server, and
            there's no backend involved at all.
          </p>
          <p style={{ marginBottom: 0, marginTop: "10px" }}>
            Creating an account is optional and only changes{" "}
            <em>where</em> that same data lives: instead of your browser, it's
            stored on our own server (not a third party), tied to your
            account, so it can follow you across devices. Your password is
            hashed, never stored in plain text, and every request for your
            data is scoped to your account only.
          </p>
        </div>

        <div className="dashboard-panel mb-3">
          <h2 style={{ fontSize: "1.1rem", marginBottom: "10px" }}>
            Analytics, cookies, and tracking
          </h2>
          <p style={{ marginBottom: 0 }}>
            Thrive Mind never uses analytics or tracking scripts, and sets no
            cookies at all unless you sign in. Signing in sets exactly one
            cookie — a functional session cookie that keeps you logged in —
            never used for tracking or shared with anyone. GitHub Pages,
            which hosts the site, may log standard server access data (like
            any web host); Thrive Mind itself adds nothing on top of that.
          </p>
        </div>

        <div className="dashboard-panel mb-3">
          <h2 style={{ fontSize: "1.1rem", marginBottom: "10px" }}>
            Deleting your data
          </h2>
          <p>
            Clearing your browser's site data for Thrive Mind removes
            everything stored locally. You can also do it right here — this
            clears your local data only; if you're signed in, it does not
            delete your account or its data on the server (there's no
            self-service account deletion yet — email us via the About Us
            page and we'll delete it by hand):
          </p>

          <Button variant="outline-danger" onClick={handleClearData}>
            Clear My Data
          </Button>

          {cleared && (
            <p style={{ marginTop: "12px", marginBottom: 0, color: "#1F7A46" }}>
              ✅ Your local data has been cleared.
            </p>
          )}
        </div>

        <div className="dashboard-panel mb-3">
          <h2 style={{ fontSize: "1.1rem", marginBottom: "10px" }}>
            Not a diagnostic tool
          </h2>
          <p style={{ marginBottom: 0 }}>
            The Mood Quiz is a reflection tool, not a screening or diagnostic
            instrument. Its category scores and recommendations are produced
            by a small set of fixed, published rules — not a clinical
            assessment, and not personalized medical or mental health advice.
          </p>
        </div>

        <div className="dashboard-panel">
          <h2 style={{ fontSize: "1.1rem", marginBottom: "10px" }}>
            Emergency limitations
          </h2>
          <p style={{ marginBottom: 0 }}>
            Thrive Mind cannot detect a crisis and cannot contact anyone on
            your behalf. If you or someone else is in immediate danger, call
            or text <strong>988</strong> (Suicide & Crisis Lifeline), call{" "}
            <strong>911</strong>, or go to your nearest emergency room.
          </p>
        </div>
      </div>
    </Container>
  );
}

export default Privacy;
