import { useEffect, useMemo, useState } from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import {
  getDateKey,
  getEntryForDate,
  getEntryForDateFrom,
  getStreak,
  getStreakFrom,
  saveEntryForDate
} from "../utils/selfCareHistory";
import { DEFAULT_TASKS } from "../utils/selfCareTasks";
import { fetchSelfCareDays, putSelfCareDay } from "../api/selfCareDays.js";
import { useAuth } from "../context/AuthContext.jsx";
import Icon from "./Icon";
import TaskCard from "./self-care-planner/TaskCard.jsx";
import ProgressSummaryCard from "./self-care-planner/ProgressSummaryCard.jsx";

function SelfCarePlanner() {
  const { user } = useAuth();
  const [checkedItems, setCheckedItems] = useState(() =>
    getEntryForDate(DEFAULT_TASKS)
  );
  const [remoteHistory, setRemoteHistory] = useState(null);

  // Signed-in users' checklist lives on the server, not localStorage. Fetch
  // it once we know who's signed in, and use it to seed today's checkboxes.
  // (remoteHistory is only ever read when `user` is set, so there's no need
  // to clear it out on sign-out.)
  useEffect(() => {
    if (!user) return;

    let cancelled = false;
    fetchSelfCareDays(90).then((history) => {
      if (cancelled) return;
      setRemoteHistory(history);
      setCheckedItems(getEntryForDateFrom(history, DEFAULT_TASKS));
    });

    return () => {
      cancelled = true;
    };
  }, [user]);

  // Reactively syncs whichever backend applies on every checkedItems change
  // (toggle, reset, or complete-all) — same pattern regardless of how the
  // change happened. Best-effort for the API path: today's checklist is
  // already updated locally, so a failed sync just means this change won't
  // show up in the synced history yet.
  useEffect(() => {
    if (user) {
      const dateKey = getDateKey();
      putSelfCareDay(dateKey, checkedItems)
        .then(() =>
          setRemoteHistory((prev) => ({ ...(prev ?? {}), [dateKey]: checkedItems }))
        )
        .catch(() => {});
      return;
    }
    saveEntryForDate(checkedItems);
  }, [checkedItems, user]);

  const completedCount = useMemo(() => {
    return Object.values(checkedItems).filter(Boolean).length;
  }, [checkedItems]);

  const streak = useMemo(() => {
    if (!user) return getStreak(completedCount);
    return getStreakFrom(remoteHistory ?? {}, completedCount);
  }, [user, remoteHistory, completedCount]);

  const progressPercent = useMemo(() => {
    return Math.round((completedCount / DEFAULT_TASKS.length) * 100);
  }, [completedCount]);

  const progressMessage = useMemo(() => {
    if (progressPercent >= 80) {
      return "You showed up for yourself in so many small ways today. So proud of you!!!";
    }

    if (progressPercent >= 45) {
      return "You are making meaningful progress. Small caring actions really do count.";
    }

    if (progressPercent >= 20) {
      return "A gentle reminder: even one completed step is still care.";
    }

    return "Start with one tiny act of care. You do not have to do everything at once.";
  }, [progressPercent]);

  const handleToggle = (taskId) => {
    setCheckedItems((previousItems) => ({
      ...previousItems,
      [taskId]: !previousItems[taskId]
    }));
  };

  const handleReset = () => {
    const resetItems = DEFAULT_TASKS.reduce((accumulator, task) => {
      accumulator[task.id] = false;
      return accumulator;
    }, {});

    setCheckedItems(resetItems);
  };

  const handleCompleteAll = () => {
    const completedItems = DEFAULT_TASKS.reduce((accumulator, task) => {
      accumulator[task.id] = true;
      return accumulator;
    }, {});

    setCheckedItems(completedItems);
  };

  return (
    <div className="page-shell">
      <Container>
        <Card className="planner-card border-0 shadow-sm">
          <Card.Body className="p-4 p-md-5">
            <div className="planner-header">
              <h1 className="page-title">
                <Icon name="planner" size={28} /> Self-Care Planner
              </h1>

              <h2
                className="mb-3"
                style={{
                  color: "#B24373",
                  fontSize: "1.25rem"
                }}
              >
                A gentle checklist for today
              </h2>

              {streak > 0 && (
                <div className="planner-streak-badge">
                  🔥 {streak}-day streak
                </div>
              )}
            </div>

            <ProgressSummaryCard
              completedCount={completedCount}
              totalCount={DEFAULT_TASKS.length}
              progressPercent={progressPercent}
              progressMessage={progressMessage}
            />

            <h2 className="visually-hidden-custom">
              Self-Care Checklist Tasks
            </h2>

            <Row className="g-3">
              {DEFAULT_TASKS.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  checked={checkedItems[task.id]}
                  onToggle={() => handleToggle(task.id)}
                />
              ))}
            </Row>

            <div className="d-flex flex-wrap gap-3 mt-4">
              <Button className="planner-primary-btn" onClick={handleCompleteAll}>
                Complete All
              </Button>

              <Button
                variant="outline-secondary"
                className="planner-secondary-btn"
                onClick={handleReset}
              >
                Reset Planner
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default SelfCarePlanner;