import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  getFocusForEntry,
  getLastMoodEntryFrom,
  getMoodHistory,
  getMoodTrend,
  getRecentEntriesFrom,
  getShortLabelForEntry,
  getWellnessInsightFrom
} from "../utils/moodHistory";
import {
  getEntryForDateFrom,
  getHistory,
  getMonthlyCompletedCountFrom,
  getStreakFrom
} from "../utils/selfCareHistory";
import { DEFAULT_TASKS } from "../utils/selfCareTasks";
import { getRecommendedActions, TYPE_LABELS } from "../utils/recommendations";
import {
  CATEGORY_NAMES,
  getDailyCategorySeries,
  getDailyMoodSeries,
  getHabitMoodAssociation
} from "../utils/analytics";
import { fetchMoodEntries } from "../api/moodEntries.js";
import { fetchSelfCareDays } from "../api/selfCareDays.js";
import { useAuth } from "../context/AuthContext.jsx";
import Icon from "./Icon";
import TrendChart from "./TrendChart.jsx";

const TREND_ARROW = { up: "↗", down: "↘", flat: "→", unknown: "—" };

const CATEGORY_COLORS = {
  Mood: "#4338ca",
  Energy: "#8a5a00",
  Sleep: "#2c6fb3",
  Connection: "#b24373",
  Stress: "#4c9a8e"
};

const RANGE_OPTIONS = [7, 14, 30];

const formatChartDate = (dateKey) =>
  new Date(`${dateKey}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric"
  });

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
  const { user } = useAuth();
  const [remoteMoodEntries, setRemoteMoodEntries] = useState(null);
  const [remoteSelfCareHistory, setRemoteSelfCareHistory] = useState(null);

  // Signed-in users' data lives on the server, not localStorage. Fetch both
  // sources once we know who's signed in; a signed-out user just reads
  // localStorage synchronously, exactly as before. (remoteMoodEntries stays
  // null until the fetch resolves, which doubles as the loading flag below —
  // no separate "fetching" state needed.)
  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    Promise.all([fetchMoodEntries(30), fetchSelfCareDays(90)]).then(
      ([entries, history]) => {
        if (cancelled) return;
        setRemoteMoodEntries(entries);
        setRemoteSelfCareHistory(history);
      }
    );

    return () => {
      cancelled = true;
    };
  }, [user]);

  const moodEntries = user ? remoteMoodEntries ?? [] : getMoodHistory();
  const selfCareHistoryData = user ? remoteSelfCareHistory ?? {} : getHistory();

  const lastEntry = getLastMoodEntryFrom(moodEntries);
  const todaysMoodEntry = lastEntry && isToday(lastEntry.date) ? lastEntry : null;
  const recentEntries = getRecentEntriesFrom(moodEntries, 7);
  const trend = getMoodTrend(recentEntries);
  const insight = getWellnessInsightFrom(moodEntries);

  const todaysTasks = getEntryForDateFrom(selfCareHistoryData, DEFAULT_TASKS);
  const todaysCompletedCount = Object.values(todaysTasks).filter(Boolean).length;
  const streak = getStreakFrom(selfCareHistoryData, todaysCompletedCount);
  const monthlyCompleted = getMonthlyCompletedCountFrom(selfCareHistoryData);

  const hasAnyData = Boolean(lastEntry) || todaysCompletedCount > 0 || streak > 0;
  const stillLoadingRemote = Boolean(user) && remoteMoodEntries === null;

  const focus = getFocusForEntry(lastEntry);
  // moodEntries is newest-first, so excluding index 0 (== lastEntry) leaves
  // the prior check-ins getRecommendedActions uses for frequency-aware
  // reasons (e.g. "Sleep has been your lowest category in 3 of your last 5
  // check-ins").
  const recommendedActions = getRecommendedActions(lastEntry, moodEntries.slice(1));

  const [trendRangeDays, setTrendRangeDays] = useState(14);
  const moodSeries = getDailyMoodSeries(moodEntries, trendRangeDays);
  const categorySeries = getDailyCategorySeries(moodEntries, trendRangeDays);
  const habitMoodAssociation = getHabitMoodAssociation(
    moodEntries,
    selfCareHistoryData
  );

  const [barsVisible, setBarsVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setBarsVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <Container className="mt-4">
      <div className="card-style">
        <h1 className="page-title">
          <Icon name="sprout" size={28} /> My Wellness
        </h1>

        <p style={{ color: "#4B5563", marginBottom: "24px" }}>
          A quick snapshot of how you've been doing, pulled together from your
          mood check-ins and self-care habits.
        </p>

        {stillLoadingRemote ? (
          <p className="dashboard-panel-empty">Loading your wellness data…</p>
        ) : !hasAnyData ? (
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
                <div className="dashboard-stat-tile fade-in-item" style={{ animationDelay: "0s" }}>
                  <div className="dashboard-stat-label">Today's mood</div>
                  <div className="dashboard-stat-value">
                    {todaysMoodEntry
                      ? `${todaysMoodEntry.emoji} ${getShortLabelForEntry(todaysMoodEntry)}`
                      : "Not checked in yet"}
                  </div>
                </div>
              </Col>

              <Col sm={6} lg={3}>
                <div className="dashboard-stat-tile fade-in-item" style={{ animationDelay: "0.06s" }}>
                  <div className="dashboard-stat-label">7-day trend</div>
                  <div className="dashboard-stat-value">
                    {TREND_ARROW[trend.direction]} {trend.label}
                  </div>
                </div>
              </Col>

              <Col sm={6} lg={3}>
                <div className="dashboard-stat-tile fade-in-item" style={{ animationDelay: "0.12s" }}>
                  <div className="dashboard-stat-label">Habits today</div>
                  <div className="dashboard-stat-value">
                    {todaysCompletedCount}/{DEFAULT_TASKS.length}
                  </div>
                </div>
              </Col>

              <Col sm={6} lg={3}>
                <div className="dashboard-stat-tile fade-in-item" style={{ animationDelay: "0.18s" }}>
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
                              style={{
                                height: barsVisible
                                  ? `${Math.max(entry.pct, 6)}%`
                                  : "0%"
                              }}
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

                  {recommendedActions.length > 0 && (
                    <div className="dashboard-recommendation">
                      <div className="dashboard-recommendation-label">
                        What you could try now
                      </div>

                      <div className="dashboard-action-list">
                        {recommendedActions.map((action) => (
                          <Link
                            to={action.link}
                            className="dashboard-action-row"
                            key={action.id}
                            aria-label={`${TYPE_LABELS[action.type]}: ${action.title}`}
                          >
                            <span aria-hidden="true">{action.emoji}</span>
                            <span className="dashboard-action-text">
                              <strong>{action.title}</strong>
                              <span className="dashboard-action-type">
                                {TYPE_LABELS[action.type]}
                              </span>
                            </span>
                          </Link>
                        ))}
                      </div>
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

            {moodSeries.length >= 2 && (
              <Row className="g-4 mt-1">
                <Col lg={12}>
                  <div className="dashboard-panel">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "10px",
                        marginBottom: "14px"
                      }}
                    >
                      <h2 style={{ fontSize: "1.15rem", margin: 0 }}>
                        Mood trend
                      </h2>

                      <div
                        role="group"
                        aria-label="Trend chart date range"
                        style={{ display: "flex", gap: "6px" }}
                      >
                        {RANGE_OPTIONS.map((days) => (
                          <button
                            key={days}
                            type="button"
                            onClick={() => setTrendRangeDays(days)}
                            aria-pressed={trendRangeDays === days}
                            style={{
                              border: "1.5px solid #d7d4e8",
                              borderRadius: "999px",
                              padding: "4px 12px",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              cursor: "pointer",
                              background:
                                trendRangeDays === days
                                  ? "var(--color-primary)"
                                  : "#fff",
                              color: trendRangeDays === days ? "#fff" : "#4B5563"
                            }}
                          >
                            {days}d
                          </button>
                        ))}
                      </div>
                    </div>

                    <TrendChart
                      series={[
                        {
                          label: "Overall",
                          color: "var(--accessible-purple, #4338ca)",
                          points: moodSeries.map((p) => ({
                            date: p.date,
                            value: p.pct
                          }))
                        }
                      ]}
                      days={trendRangeDays}
                      formatDate={formatChartDate}
                    />
                  </div>
                </Col>

                {categorySeries.length >= 2 && (
                  <Col lg={12}>
                    <div className="dashboard-panel">
                      <h2 style={{ fontSize: "1.15rem", marginBottom: "14px" }}>
                        Category trends
                      </h2>

                      <TrendChart
                        series={CATEGORY_NAMES.map((name) => ({
                          label: name,
                          color: CATEGORY_COLORS[name],
                          points: categorySeries
                            .filter((row) => row[name] !== undefined)
                            .map((row) => ({ date: row.date, value: row[name] }))
                        })).filter((s) => s.points.length >= 2)}
                        days={trendRangeDays}
                        formatDate={formatChartDate}
                      />
                    </div>
                  </Col>
                )}

                {habitMoodAssociation && (
                  <Col lg={12}>
                    <div className="dashboard-insight">
                      <div className="dashboard-insight-text">
                        📊 On days you completed {DEFAULT_TASKS.length >= 4 ? "4+" : "more"}{" "}
                        self-care activities, your average check-in score was{" "}
                        <strong>
                          {Math.abs(habitMoodAssociation.diffPct)}%{" "}
                          {habitMoodAssociation.diffPct >= 0 ? "higher" : "lower"}
                        </strong>{" "}
                        ({habitMoodAssociation.highCareAvg}% vs.{" "}
                        {habitMoodAssociation.otherAvg}%, based on{" "}
                        {habitMoodAssociation.highCareDays +
                          habitMoodAssociation.otherDays}{" "}
                        check-ins). This is an association seen in your own
                        data, not a guarantee — small samples can be noisy.
                      </div>
                    </div>
                  </Col>
                )}
              </Row>
            )}
          </>
        )}
      </div>
    </Container>
  );
}

export default Dashboard;
