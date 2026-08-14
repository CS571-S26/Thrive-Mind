import { Link } from "react-router-dom";

function CrisisBanner() {
  return (
    <div className="crisis-banner" role="note" aria-label="Crisis support resources">
      💜 If you're in crisis, you're not alone — <a href="tel:988">call or text 988</a>{" "}
      or <Link to="/resources">see more resources</Link>.
    </div>
  );
}

export default CrisisBanner;
