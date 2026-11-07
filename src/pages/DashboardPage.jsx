
import DashboardLayout from "../components/DashboardLayout";

function DashboardPage({
  navigate,
  goals = [],
  setShowProfile,
  currentStreak = 0,
  longestStreak = 0,
  completionDates = [],
  microGoals = [],
}) {
  // GET TODAY'S DATE
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // FIND MONDAY OF THE CURRENT WEEK
  const weekStart = new Date(today);
  const dayOffset = (today.getDay() + 6) % 7;

  weekStart.setDate(today.getDate() - dayOffset);

  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  // GENERATE WEEKLY STREAK CALENDAR
  const streakWeekDays = Array.from(
    { length: 7 },
    (_, index) => {
      const date = new Date(weekStart);

      date.setDate(weekStart.getDate() + index);

      const dateString = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
      ].join("-");

      const isDone = completionDates.includes(dateString);
      const isToday = dateString === todayString;

      return {
        date: dateString,
        label: date
          .toLocaleDateString("en-US", {
            weekday: "short",
          })
          .toUpperCase(),
        mark: isDone ? "✓" : isToday ? "●" : "",
        state: isDone ? "done" : isToday ? "today" : "",
      };
    }
  );

  // COUNT COMPLETED MICRO-GOALS
  const completedCount = microGoals.filter(
    (goal) => goal.completed
  ).length;

  // CALCULATE MICRO-GOAL COMPLETION PERCENTAGE
  const microGoalPercentage =
    microGoals.length > 0
      ? Math.round(
          (completedCount / microGoals.length) * 100
        )
      : 0;

  

  return (
    <DashboardLayout
      navigate={navigate}
      setShowProfile={setShowProfile}
    >
      {/* DASHBOARD HERO */}

      <section className="dashboard-hero">
        <div className="dashboard-hero-content">
          <div className="dashboard-eyebrow">
            YOUR STUDY JOURNEY
          </div>

          <h1>
            Keep moving.
            <br />
            <span>You're doing great.</span>
          </h1>

          <p>
            You have completed {microGoalPercentage}% of your
            micro-goals. Keep building consistent study habits
            one small step at a time.
          </p>

          <div className="dashboard-hero-actions">
            <button
              className="dashboard-primary-button"
              onClick={() => navigate("createGoal")}
            >
              ＋ Create Goal
            </button>

            <button
              className="dashboard-secondary-button"
              onClick={() => navigate("reports")}
            >
              View Report →
            </button>
          </div>
        </div>

        {/* PROGRESS VISUAL */}

        <div className="dashboard-progress-visual">
          <div className="progress-orbit"></div>

          <div className="dashboard-progress-ring">
            <div>
              <strong>{microGoalPercentage}%</strong>
              <span>
                MICRO-GOAL
                <br />
                PROGRESS
              </span>
            </div>
          </div>

          <div className="progress-floating-card">
            <span>✓</span>

            <div>
              <strong>Great progress</strong>
              <small>Keep your streak alive</small>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS */}

      <section className="dashboard-stats">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-top">
            <span className="dashboard-stat-icon">🎯</span>
            <span className="dashboard-stat-trend">
              {goals.length} total
            </span>
          </div>

          <strong>{goals.length}</strong>
          <span>Active Goals</span>
          <small>Your academic targets</small>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-top">
            <span className="dashboard-stat-icon">✓</span>
            <span className="dashboard-stat-trend">
              {microGoals.length} total
            </span>
          </div>

          <strong>{completedCount}</strong>
          <span>Micro-Goals Completed</span>
          <small>Across your current tasks</small>
        </div>

        <div className="dashboard-stat-card dashboard-stat-highlight">
          <div className="dashboard-stat-top">
            <span className="dashboard-stat-icon">🔥</span>

            <span className="dashboard-stat-trend">
              {currentStreak > 0 ? "Active" : "Start today"}
            </span>
          </div>

          <strong>{currentStreak}</strong>
          <span>Study Streak</span>

          <small>
            Days in a row · Best: {longestStreak}{" "}
            {longestStreak === 1 ? "day" : "days"}
          </small>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-top">
            <span className="dashboard-stat-icon">◷</span>
            <span className="dashboard-stat-trend">
              Study sessions
            </span>
          </div>

          <strong>4.5h</strong>
          <span>Study Time</span>
          <small>Sample activity data</small>
        </div>
      </section>

      {/* STUDY STREAK */}

      <section className="dashboard-streak">
        <div className="dashboard-section-heading">
          <div>
            <span>CONSISTENCY</span>
            <h2>Your study streak</h2>
          </div>

          <div className="dashboard-streak-number">
            🔥 {currentStreak}{" "}
            {currentStreak === 1 ? "day" : "days"}
          </div>
        </div>

        {/* WEEKLY STREAK CALENDAR */}

        <div className="streak-week">
          {streakWeekDays.map(
            ({ date, label, mark, state }) => (
              <div
                className="streak-week-day"
                key={date}
              >
                <span>{label}</span>

                <div
                  className={`streak-week-circle ${state}`}
                >
                  {mark}
                </div>
              </div>
            )
          )}
        </div>

        <div className="streak-bottom-message">
          <span>🔥</span>

          <p>
            {currentStreak > 0
              ? `Amazing! You've studied consistently for ${currentStreak} ${
                  currentStreak === 1 ? "day" : "days"
                }. Keep your streak alive!`
              : "Start your study streak today by completing a micro-goal!"}
          </p>
        </div>
      </section>

      {/* MAIN DASHBOARD GRID */}

      <section className="dashboard-main-grid">
        {/* TODAY'S MICRO-GOALS */}

        <div className="dashboard-modern-card">
          <div className="modern-card-heading">
            <div>
              <span>TODAY</span>
              <h2>Today's Micro-Goals</h2>
            </div>

            <button
              onClick={() => navigate("microgoals")}
            >
              View all →
            </button>
          </div>

          <div className="dashboard-tasks">
            {microGoals.length > 0 ? (
              microGoals.slice(0, 4).map((goal) => (
                <div
                  className={`dashboard-task ${
                    goal.completed ? "completed" : ""
                  }`}
                  key={goal.id}
                >
                  <div className="dashboard-task-check">
                    {goal.completed ? "✓" : ""}
                  </div>

                  <div>
                    <strong>{goal.title}</strong>

                    <small>
                      {goal.completed
                        ? "Completed"
                        : "Not completed yet"}
                    </small>
                  </div>

                  <span>
                    {goal.completed ? "Done" : "Next"}
                  </span>
                </div>
              ))
            ) : (
              <p>
                No micro-goals yet. Create your first
                micro-goal to get started!
              </p>
            )}
          </div>
        </div>

        {/* GOAL PROGRESS */}

        <div className="dashboard-modern-card">
          <div className="modern-card-heading">
            <div>
              <span>YOUR GOALS</span>
              <h2>Goal Progress</h2>
            </div>

            <button
              onClick={() => navigate("goals")}
            >
              View all →
            </button>
          </div>

          <div className="dashboard-goal-list">
            {goals.length > 0 ? (
              goals.slice(0, 4).map((goal) => (
                <div
                  className="dashboard-goal"
                  key={goal.id}
                >
                  <div className="dashboard-goal-info">
                    <div>
                      <strong>{goal.title}</strong>
                      <span>{goal.subject}</span>
                    </div>

                    <strong>{goal.progress}%</strong>
                  </div>

                  <div className="dashboard-goal-bar">
                    <span
                      style={{
                        width: `${goal.progress}%`,
                      }}
                    ></span>
                  </div>
                </div>
              ))
            ) : (
              <p>No academic goals created yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* LOWER SECTION */}

      <section className="dashboard-lower-grid">
        {/* STUDY ACTIVITY */}

        <div className="dashboard-modern-card activity-chart-card">
          <div className="modern-card-heading">
            <div>
              <span>THIS WEEK</span>
              <h2>Study Activity</h2>
            </div>

            <div className="chart-total">
              4.5h
            </div>
          </div>

          <div className="dashboard-chart">
            {[60, 80, 45, 90, 70, 55, 85].map(
              (height, index) => (
                <div
                  className="dashboard-chart-column"
                  key={index}
                >
                  <div className="dashboard-chart-track">
                    <div
                      className="dashboard-chart-bar"
                      style={{
                        height: `${height}%`,
                      }}
                    ></div>
                  </div>

                  <span>
                    {["M", "T", "W", "T", "F", "S", "S"][index]}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* QUICK ACTIONS */}

        <div className="dashboard-modern-card quick-action-card">
          <div className="modern-card-heading">
            <div>
              <span>SHORTCUTS</span>
              <h2>Quick Actions</h2>
            </div>
          </div>

          <button
            onClick={() => navigate("createGoal")}
          >
            <span>＋</span>

            <div>
              <strong>Create New Goal</strong>
              <small>Set a new academic target</small>
            </div>

            <b>→</b>
          </button>

          <button
            onClick={() => navigate("activity")}
          >
            <span>◷</span>

            <div>
              <strong>Log Study Activity</strong>
              <small>Record your study session</small>
            </div>

            <b>→</b>
          </button>

          <button
            onClick={() => navigate("reports")}
          >
            <span>▥</span>

            <div>
              <strong>Progress Report</strong>
              <small>Review your study performance</small>
            </div>

            <b>→</b>
          </button>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default DashboardPage;
