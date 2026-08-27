import { ProgressBar } from "react-bootstrap";

function ProgressIndicator({ progress, done }) {
  return (
    <ProgressBar
      style={{
        height: "8px",
        borderRadius: "8px",
        marginBottom: "24px"
      }}
    >
      <ProgressBar
        now={progress}
        variant={done ? "success" : "info"}
        aria-label={`Mood quiz progress is ${Math.round(progress)} percent`}
      />
    </ProgressBar>
  );
}

export default ProgressIndicator;
