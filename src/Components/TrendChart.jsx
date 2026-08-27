// A small hand-rolled SVG line chart — no charting library dependency, in
// keeping with the app's existing hand-built icon/visual system. The chart
// itself is decorative (aria-hidden): the real data is always available as
// a visually-hidden table right below it, so screen reader users get exact
// values instead of a chart description.
const WIDTH = 600;
const HEIGHT = 180;
const PADDING = 24;

function TrendChart({ series, days, formatDate }) {
  const allPoints = series.flatMap((s) => s.points);
  if (allPoints.length === 0) return null;

  const xForIndex = (index, count) => {
    if (count <= 1) return WIDTH / 2;
    return PADDING + (index / (count - 1)) * (WIDTH - PADDING * 2);
  };

  const yForValue = (value) =>
    HEIGHT - PADDING - (value / 100) * (HEIGHT - PADDING * 2);

  const gridLines = [0, 25, 50, 75, 100];

  return (
    <div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="presentation"
        aria-hidden="true"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        {gridLines.map((value) => (
          <line
            key={value}
            x1={PADDING}
            x2={WIDTH - PADDING}
            y1={yForValue(value)}
            y2={yForValue(value)}
            stroke="#e5e1f5"
            strokeWidth="1"
          />
        ))}

        {series.map((s) => {
          const count = s.points.length;
          const linePoints = s.points
            .map((p, i) => `${xForIndex(i, count)},${yForValue(p.value)}`)
            .join(" ");

          return (
            <g key={s.label}>
              <polyline
                points={linePoints}
                fill="none"
                stroke={s.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {s.points.map((p, i) => (
                <circle
                  key={p.date}
                  cx={xForIndex(i, count)}
                  cy={yForValue(p.value)}
                  r="3.5"
                  fill={s.color}
                />
              ))}
            </g>
          );
        })}
      </svg>

      {series.length > 1 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "8px",
            justifyContent: "center"
          }}
        >
          {series.map((s) => (
            <span
              key={s.label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "0.78rem",
                color: "#4B5563"
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "9px",
                  height: "9px",
                  borderRadius: "50%",
                  background: s.color,
                  display: "inline-block"
                }}
              />
              {s.label}
            </span>
          ))}
        </div>
      )}

      <table className="visually-hidden-custom">
        <caption>
          {series.map((s) => s.label).join(", ")} over the last {days} days
        </caption>
        <thead>
          <tr>
            <th scope="col">Date</th>
            {series.map((s) => (
              <th scope="col" key={s.label}>
                {s.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {series[0].points.map((p, i) => (
            <tr key={p.date}>
              <th scope="row">{formatDate(p.date)}</th>
              {series.map((s) => (
                <td key={s.label}>{s.points[i]?.value ?? "—"}%</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrendChart;
