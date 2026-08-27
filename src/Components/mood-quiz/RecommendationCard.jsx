import { Link } from "react-router-dom";
import { TYPE_LABELS } from "../../utils/recommendations";

function RecommendationCard({ action }) {
  return (
    <Link
      to={action.link}
      className="mood-action-card"
      aria-label={`${TYPE_LABELS[action.type]}: ${action.title} — ${action.desc}${
        action.reason ? ` Why: ${action.reason}` : ""
      }`}
    >
      <span className="mood-action-type">{TYPE_LABELS[action.type]}</span>
      <div className="mood-action-emoji" aria-hidden="true">
        {action.emoji}
      </div>
      <div className="mood-action-title">{action.title}</div>
      <p className="mood-action-desc">{action.desc}</p>
      {action.reason && <p className="mood-action-reason">Why: {action.reason}</p>}
    </Link>
  );
}

export default RecommendationCard;
