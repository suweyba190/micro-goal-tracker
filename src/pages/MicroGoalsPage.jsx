import DashboardLayout from "../components/DashboardLayout";

function MicroGoalsPage({
  navigate,
  microGoals,
  toggleMicroGoal,
  completedMicroGoals,
  setShowProfile,
}) {
  const totalGoals = microGoals.length;
  const progress =
    totalGoals > 0 ? Math.round((completedMicroGoals / totalGoals) * 100) : 0;

  return (
    <DashboardLayout
      navigate={navigate}
      setShowProfile={setShowProfile}
      activePage="microgoals"
    >
      <div className="micro-goals-page">

        {/* Page Header */}
        <div className="micro-header">
          <div>
            <p className="page-label">DAILY MICRO-GOALS</p>
            <h1>Micro-goals</h1>
            <p className="page-description">
              Complete smaller steps to make steady progress toward your
              academic goals.
            </p>
          </div>

          <div className="micro-progress-card">
            <div className="micro-progress-number">
              {completedMicroGoals}
              <span>/ {totalGoals}</span>
            </div>

            <p>completed</p>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <strong>{progress}% complete</strong>
          </div>
        </div>

        {/* Goal Checklist */}
        <div className="micro-content">

          <div className="micro-card">
            <div className="micro-card-header">
              <div>
                <h2>Today's Checklist</h2>
                <p>Small actions that move your goals forward.</p>
              </div>

              <div className="check-count">
                {completedMicroGoals}/{totalGoals}
              </div>
            </div>

            <div className="micro-list">
              {microGoals.map((goal) => (
                <div
                  key={goal.id}
                  className={`micro-item ${
                    goal.done ? "micro-item-done" : ""
                  }`}
                  onClick={() => toggleMicroGoal(goal.id)}
                >
                  <div
                    className={`micro-checkbox ${
                      goal.done ? "checked" : ""
                    }`}
                  >
                    {goal.done ? "✓" : ""}
                  </div>

                  <div className="micro-item-text">
                    <h3>{goal.title}</h3>
                    <p>
                      {goal.done
                        ? "Completed — great job!"
                        : "Not completed yet"}
                    </p>
                  </div>

                  <div className="micro-status">
                    {goal.done ? "Completed" : "To do"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Motivation Card */}
          <div className="micro-motivation">
            <div className="motivation-icon">✦</div>

            <div>
              <h2>Keep going, Ahmed! 💪</h2>
              <p>
                You're already {completedMicroGoals} step
                {completedMicroGoals !== 1 ? "s" : ""} closer to your goals.
                Consistency is built one small task at a time.
              </p>
            </div>
          </div>

          {/* Back Button */}
          <button
            className="back-goals-button"
            onClick={() => navigate("goals")}
          >
            ← Back to Goals
          </button>

        </div>
      </div>
    </DashboardLayout>
  );
}

export default MicroGoalsPage;