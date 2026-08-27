function CategoryBreakdown({ categoryScores, focusCategory, barsVisible }) {
  return (
    <div className="mood-breakdown">
      <h3 className="mood-breakdown-title">Your check-in</h3>

      {categoryScores.map((entry) => (
        <div className="mood-category-row" key={entry.category}>
          <span className="mood-category-label">{entry.category}</span>

          <span className="mood-category-track">
            <span
              className="mood-category-fill"
              style={{ width: barsVisible ? `${entry.pct}%` : "0%" }}
            />
          </span>

          <span className="mood-category-pct">{entry.pct}%</span>
        </div>
      ))}

      {focusCategory && (
        <p className="mood-focus-callout">
          🎯 Your biggest area to focus on today: <strong>{focusCategory}</strong>
        </p>
      )}
    </div>
  );
}

export default CategoryBreakdown;
