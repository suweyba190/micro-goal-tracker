import DashboardLayout from "../components/DashboardLayout";

function DashboardPage({
  navigate,
  goals,
  setShowProfile,
}) {
  const completedGoals = goals.filter(
    (goal) => goal.progress === 100
  ).length;

  const averageProgress =
    goals.length > 0
      ? Math.round(
          goals.reduce((sum, goal) => sum + goal.progress, 0) /
            goals.length
        )
      : 0;

  return (
    <DashboardLayout
      navigate={navigate}
      setShowProfile={setShowProfile}
      activePage="dashboard"
    >
      <div className="dashboard-page">

        {/* Welcome */}
        <div className="dashboard-welcome">
          <div>
            <p className="page-label">STUDENT DASHBOARD</p>

            <h1>
              Good evening, Ahmed 👋
            </h1>

            <p>
              Keep going. Every small step counts.
            </p>
          </div>

          <button
            className="dashboard-add-button"
            onClick={() => navigate("createGoal")}
          >
            + Create Goal
          </button>
        </div>

        {/* Statistics */}
        <div className="dashboard-stats">

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">🎯</div>

            <div>
              <span>Total Goals</span>
              <strong>{goals.length}</strong>
              <small>Academic goals</small>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">✓</div>

            <div>
              <span>Goals Completed</span>
              <strong>{completedGoals}</strong>
              <small>Completed goals</small>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">↗</div>

            <div>
              <span>Overall Progress</span>
              <strong>{averageProgress}%</strong>
              <small>Across all goals</small>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">🔥</div>

            <div>
              <span>Study Streak</span>
              <strong>7</strong>
              <small>Days in a row</small>
            </div>
          </div>

        </div>

        {/* Main content */}
        <div className="dashboard-main-grid">

          {/* Goals */}
          <div className="dashboard-goals-card">

            <div className="dashboard-card-heading">
              <div>
                <h2>My Academic Goals</h2>
                <p>Keep track of your current goals.</p>
              </div>

              <button
                onClick={() => navigate("goals")}
                className="view-all-button"
              >
                View all →
              </button>
            </div>

            <div className="dashboard-goal-list">

              {goals.slice(0, 4).map((goal) => (
                <div
                  className="dashboard-goal-item"
                  key={goal.id}
                >
                  <div className="goal-item-top">

                    <div>
                      <h3>{goal.title}</h3>
                      <span>{goal.subject}</span>
                    </div>

                    <strong>{goal.progress}%</strong>

                  </div>

                  <div className="dashboard-progress-track">
                    <div
                      className="dashboard-progress-fill"
                      style={{
                        width: `${goal.progress}%`,
                      }}
                    ></div>
                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Quick Actions */}
          <div className="dashboard-actions-card">

            <p className="page-label">QUICK ACTIONS</p>

            <h2>Stay productive.</h2>

            <p className="quick-description">
              Choose an action and keep making progress on your academic
              goals.
            </p>

            <button
              onClick={() => navigate("createGoal")}
              className="quick-action"
            >
              <span>+</span>
              <div>
                <strong>Create a Goal</strong>
                <small>Set a new academic target</small>
              </div>
            </button>

            <button
              onClick={() => navigate("microgoals")}
              className="quick-action"
            >
              <span>✓</span>
              <div>
                <strong>View Micro-goals</strong>
                <small>Complete your smaller tasks</small>
              </div>
            </button>

            <button
              onClick={() => navigate("activity")}
              className="quick-action"
            >
              <span>◷</span>
              <div>
                <strong>Log Activity</strong>
                <small>Record your study session</small>
              </div>
            </button>

          </div>

        </div>

        {/* Bottom progress section */}
        <div className="dashboard-bottom-card">

          <div>
            <p className="page-label">YOUR PROGRESS</p>
            <h2>You're making progress 🎉</h2>
            <p>
              Keep breaking your academic goals into smaller, manageable
              micro-goals.
            </p>
          </div>

          <div className="dashboard-big-progress">

            <div className="big-progress-number">
              {averageProgress}%
            </div>

            <div className="big-progress-track">
              <div
                className="big-progress-fill"
                style={{
                  width: `${averageProgress}%`,
                }}
              ></div>
            </div>

            <span>Overall completion</span>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;