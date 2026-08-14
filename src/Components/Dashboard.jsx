import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  getFocusForEntry,
  getLastMoodEntry,
  getMoodTrend,
  getRecentEntries,
  getShortLabelForEntry,
  getWellnessInsight
} from "../utils/moodHistory";
import {
  getEntryForDate,
  getMonthlyCompletedCount,
  getStreak
} from "../utils/selfCareHistory";
import { DEFAULT_TASKS } from "../utils/selfCareTasks";

const TREND_ARROW = { up: "↗", down: "↘", flat: "→", unknown: "—" };

const isToday = (isoDate) => {
  const d = new Date(isoDate);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
};

function Dashboard() {
  const lastEntry = getLastMoodEntry();
  const todaysMoodEntry = lastEntry && isToday(lastEntry.date) ? lastEntry : null;
  const recentEntries = getRecentEntries(7);
  const trend = getMoodTrend(recentEntries);
  const insight = getWellnessInsight();

  const todaysTasks = getEntryForDate(DEFAULT_TASKS);
  const todaysCompletedCount = Object.values(todaysTasks).filter(Boolean).length;
  const streak = getStreak(todaysCompletedCount);
  const monthlyCompleted = getMonthlyCompletedCount();

  const hasAnyData = Boolean(lastEntry) || todaysCompletedCount > 0 || streak > 0;

  const focus = getFocusForEntry(lastEntry);

  return (
    <Container className="mt-4">
      <div className="card-style">
        <h1 style={{ marginBottom: "6px" }}>🌱 My Wellness</h1>

        <p style={{ color: "#4B5563", marginBottom: "24px" }}>
          A quick snapshot of how you've been doing, pulled together from your
          mood check-ins and self-care habits.
        </p>

        {!hasAnyData ? (
          <div className="dashboard-empty-state">
            <p style={{ marginBottom: "16px" }}>
              You haven't checked in yet — take the Mood Quiz or try a
              self-care habit to start building your wellness picture.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Button as={Link} to="/mood" className="btn-custom">
                Check My Mood →
              </Button>
              <Button as={Link} to="/planner" className="btn-custom">
                Try the Planner →
              </Button>
            </div>
          </div>
        ) : (
          <>
            <Row className="g-3 mb-4">
              <Col sm={6} lg={3}>
                <div className="dashboard-stat-tile">
                  <div className="dashboard-stat-label">Today's mood</div>
                  <div className="dashboard-stat-value">
                    {todaysMoodEntry
                      ? `${todaysMoodEntry.emoji} ${getShortLabelForEntry(todaysMoodEntry)}`
                      : "Not checked in yet"}
                  </div>
                </div>
              </Col>

              <Col sm={6} lg={3}>
                <div className="dashboard-stat-tile">
                  <div className="dashboard-stat-label">7-day trend</div>
                  <div className="dashboard-stat-value">
                    {TREND_ARROW[trend.direction]} {trend.label}
                  </div>
                </div>
              </Col>

              <Col sm={6} lg={3}>
                <div className="dashboard-stat-tile">
                  <div className="dashboard-stat-label">Habits today</div>
                  <div className="dashboard-stat-value">
                    {todaysCompletedCount}/{DEFAULT_TASKS.length}
                  </div>
                </div>
              </Col>

              <Col sm={6} lg={3}>
                <div className="dashboard-stat-tile">
                  <div className="dashboard-stat-label">Current focus</div>
                  <div className="dashboard-stat-value">{focus}</div>
                </div>
              </Col>
            </Row>

            {insight && (
              <div className="dashboard-insight">
                <div className="dashboard-insight-text">💡 {insight}</div>
                <Button as={Link} to="/resources" className="btn-custom">
                  See Resources →
                </Button>
              </div>
            )}

            <Row className="g-4">
              <Col lg={7}>
                <div className="dashboard-panel">
                  <h2 style={{ fontSize: "1.15rem", marginBottom: "14px" }}>
                    Recent check-ins
                  </h2>

                  {recentEntries.length === 0 ? (
                    <p className="dashboard-panel-empty">
                      No mood check-ins yet.{" "}
                      <Link to="/mood">Take the quiz</Link> to start tracking.
                    </p>
                  ) : (
                    <div className="dashboard-history-row">
                      {recentEntries.map((entry, i) => (
                        <div className="dashboard-history-day" key={i}>
                          <div className="dashboard-history-bar-track">
                            <div
                              className="dashboard-history-bar-fill"
                              style={{ height: `${Math.max(entry.pct, 6)}%` }}
                            />
                          </div>
                          <div className="dashboard-history-emoji">
                            {entry.emoji}
                          </div>
                          <div className="dashboard-history-weekday">
                            {new Date(entry.date).toLocaleDateString(undefined, {
                              weekday: "short"
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {lastEntry?.suggestion && (
                    <div className="dashboard-recommendation">
                      <div className="dashboard-recommendation-label">
                        Recommended for you
                      </div>
                      <p style={{ marginBottom: "10px" }}>
                        {lastEntry.suggestion}
                      </p>
                      <Button
                        as={Link}
                        to={lastEntry.link || "/resources"}
                        className="btn-custom"
                      >
                        Take me there →
                      </Button>
                    </div>
                  )}
                </div>
              </Col>

              <Col lg={5}>
                <div className="dashboard-panel">
                  <h2 style={{ fontSize: "1.15rem", marginBottom: "14px" }}>
                    Self-care snapshot
                  </h2>

                  <div className="dashboard-snapshot-row">
                    <span>🔥 Current streak</span>
                    <strong>{streak} day{streak === 1 ? "" : "s"}</strong>
                  </div>

                  <div className="dashboard-snapshot-row">
                    <span>✅ Completed this month</span>
                    <strong>{monthlyCompleted}</strong>
                  </div>

                  <div className="dashboard-snapshot-row">
                    <span>📋 Today's checklist</span>
                    <strong>
                      {todaysCompletedCount}/{DEFAULT_TASKS.length}
                    </strong>
                  </div>

                  <Button
                    as={Link}
                    to="/planner"
                    className="btn-custom mt-3"
                  >
                    Open Self-Care Planner →
                  </Button>
                </div>
              </Col>
            </Row>
          </>
        )}
      </div>
    </Container>
  );
}

export default Dashboard;
