import DashboardLayout from "../components/DashboardLayout";

function DashboardPage({
  navigate,
  goals,
  setShowProfile,
}) {
  return (
    <DashboardLayout
      navigate={navigate}
      setShowProfile={setShowProfile}
    >

      {/* =========================
          DASHBOARD HERO
      ========================= */}

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
            You have completed 78% of your planned
            study goals this week. Keep the momentum going.
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
              <strong>78%</strong>
              <span>WEEKLY<br />PROGRESS</span>
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


      {/* =========================
          QUICK STATS
      ========================= */}

      <section className="dashboard-stats">

        <div className="dashboard-stat-card">

          <div className="dashboard-stat-top">
            <span className="dashboard-stat-icon">🎯</span>
            <span className="dashboard-stat-trend">↑ 2</span>
          </div>

          <strong>
            {goals.length}
          </strong>

          <span>
            Active Goals
          </span>

          <small>
            This week
          </small>

        </div>


        <div className="dashboard-stat-card">

          <div className="dashboard-stat-top">
            <span className="dashboard-stat-icon">✓</span>
            <span className="dashboard-stat-trend">↑ 3</span>
          </div>

          <strong>
            12
          </strong>

          <span>
            Goals Completed
          </span>

          <small>
            This week
          </small>

        </div>


        <div className="dashboard-stat-card dashboard-stat-highlight">

          <div className="dashboard-stat-top">
            <span className="dashboard-stat-icon">🔥</span>
            <span className="dashboard-stat-trend">
              Active
            </span>
          </div>

          <strong>
            7
          </strong>

          <span>
            Study Streak
          </span>

          <small>
            Days in a row
          </small>

        </div>


        <div className="dashboard-stat-card">

          <div className="dashboard-stat-top">
            <span className="dashboard-stat-icon">◷</span>
            <span className="dashboard-stat-trend">↑ 1.2h</span>
          </div>

          <strong>
            4.5h
          </strong>

          <span>
            Study Time
          </span>

          <small>
            This week
          </small>

        </div>

      </section>


      {/* =========================
          STUDY STREAK
      ========================= */}

      <section className="dashboard-streak">

        <div className="dashboard-section-heading">

          <div>

            <span>
              CONSISTENCY
            </span>

            <h2>
              Your study streak
            </h2>

          </div>

          <div className="dashboard-streak-number">
            🔥 7 days
          </div>

        </div>


        <div className="streak-week">

          {[
            ["MON", "✓", "done"],
            ["TUE", "✓", "done"],
            ["WED", "✓", "done"],
            ["THU", "✓", "done"],
            ["FRI", "✓", "done"],
            ["SAT", "✓", "done"],
            ["SUN", "●", "today"],
          ].map(([day, mark, state]) => (

            <div
              className="streak-week-day"
              key={day}
            >

              <span>
                {day}
              </span>

              <div className={`streak-week-circle ${state}`}>
                {mark}
              </div>

            </div>

          ))}

        </div>


        <div className="streak-bottom-message">

          <span>🔥</span>

          <p>
            Amazing! You've studied consistently for
            <strong> 7 days.</strong> Complete today's goal
            to keep your streak alive.
          </p>

        </div>

      </section>


      {/* =========================
          MAIN DASHBOARD GRID
      ========================= */}

      <section className="dashboard-main-grid">


        {/* MICRO GOALS */}

        <div className="dashboard-modern-card">

          <div className="modern-card-heading">

            <div>

              <span>
                TODAY
              </span>

              <h2>
                Today's Micro-Goals
              </h2>

            </div>

            <button
              onClick={() => navigate("microgoals")}
            >
              View all →
            </button>

          </div>


          <div className="dashboard-tasks">

            <div className="dashboard-task completed">

              <div className="dashboard-task-check">
                ✓
              </div>

              <div>
                <strong>
                  Read Chapter 4
                </strong>

                <small>
                  Database Systems
                </small>
              </div>

              <span>
                Done
              </span>

            </div>


            <div className="dashboard-task completed">

              <div className="dashboard-task-check">
                ✓
              </div>

              <div>
                <strong>
                  Complete SQL exercises
                </strong>

                <small>
                  Database Systems
                </small>
              </div>

              <span>
                Done
              </span>

            </div>


            <div className="dashboard-task">

              <div className="dashboard-task-check"></div>

              <div>
                <strong>
                  Review SQL joins
                </strong>

                <small>
                  Database Systems
                </small>
              </div>

              <span>
                Next
              </span>

            </div>


            <div className="dashboard-task">

              <div className="dashboard-task-check"></div>

              <div>
                <strong>
                  Practice 10 questions
                </strong>

                <small>
                  Database Systems
                </small>
              </div>

              <span>
                Next
              </span>

            </div>

          </div>

        </div>


        {/* GOAL PROGRESS */}

        <div className="dashboard-modern-card">

          <div className="modern-card-heading">

            <div>

              <span>
                YOUR GOALS
              </span>

              <h2>
                Goal Progress
              </h2>

            </div>

            <button
              onClick={() => navigate("goals")}
            >
              View all →
            </button>

          </div>


          <div className="dashboard-goal-list">

            {goals.slice(0, 4).map((goal) => (

              <div
                className="dashboard-goal"
                key={goal.id}
              >

                <div className="dashboard-goal-info">

                  <div>

                    <strong>
                      {goal.title}
                    </strong>

                    <span>
                      {goal.subject}
                    </span>

                  </div>

                  <strong>
                    {goal.progress}%
                  </strong>

                </div>


                <div className="dashboard-goal-bar">

                  <span
                    style={{
                      width: `${goal.progress}%`,
                    }}
                  ></span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =========================
          LOWER SECTION
      ========================= */}

      <section className="dashboard-lower-grid">


        {/* STUDY ACTIVITY */}

        <div className="dashboard-modern-card activity-chart-card">

          <div className="modern-card-heading">

            <div>

              <span>
                THIS WEEK
              </span>

              <h2>
                Study Activity
              </h2>

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

              <span>
                SHORTCUTS
              </span>

              <h2>
                Quick Actions
              </h2>

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