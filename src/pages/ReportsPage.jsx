import DashboardLayout from "../components/DashboardLayout";

function ReportsPage({
  navigate,
  goals,
  setShowProfile,
}) {
  const totalGoals = goals.length;

  const completedGoals = goals.filter(
    (goal) => goal.progress === 100
  ).length;

  const averageProgress =
    totalGoals > 0
      ? Math.round(
          goals.reduce((sum, goal) => sum + goal.progress, 0) /
            totalGoals
        )
      : 0;

  return (
    <DashboardLayout
      navigate={navigate}
      setShowProfile={setShowProfile}
      activePage="reports"
    >
      <div className="reports-page">

        {/* Header */}
        <div className="reports-header">
          <div>
            <p className="page-label">PROGRESS ANALYTICS</p>
            <h1>Reports</h1>
            <p className="page-description">
              See how consistently you are progressing toward your academic
              goals.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="report-stats">

          <div className="report-stat-card">
            <div className="report-stat-icon">🎯</div>
            <div>
              <span>Total Goals</span>
              <strong>{totalGoals}</strong>
            </div>
          </div>

          <div className="report-stat-card">
            <div className="report-stat-icon">✓</div>
            <div>
              <span>Completed</span>
              <strong>{completedGoals}</strong>
            </div>
          </div>

          <div className="report-stat-card">
            <div className="report-stat-icon">↗</div>
            <div>
              <span>Average Progress</span>
              <strong>{averageProgress}%</strong>
            </div>
          </div>

        </div>

        {/* Progress Overview */}
        <div className="reports-main-card">

          <div className="reports-card-heading">
            <div>
              <h2>Goal Progress</h2>
              <p>
                Your current progress across all academic goals.
              </p>
            </div>
          </div>

          <div className="goal-progress-list">

            {goals.map((goal) => (
              <div className="report-goal" key={goal.id}>

                <div className="report-goal-top">
                  <div>
                    <h3>{goal.title}</h3>
                    <span>{goal.subject}</span>
                  </div>

                  <strong>{goal.progress}%</strong>
                </div>

                <div className="report-progress-track">
                  <div
                    className="report-progress-fill"
                    style={{
                      width: `${goal.progress}%`,
                    }}
                  ></div>
                </div>

              </div>
            ))}

          </div>
        </div>

        {/* Study Insight */}
        <div className="report-insight">
          <div className="insight-icon">✦</div>

          <div>
            <h2>Small progress adds up.</h2>
            <p>
              Keep completing your micro-goals and recording your study
              activities. Consistent small actions help you move closer to
              completing your larger academic goals.
            </p>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default ReportsPage;