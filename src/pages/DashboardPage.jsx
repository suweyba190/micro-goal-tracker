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

      <section className="welcome-banner">

        <div>

          <span>
            YOUR STUDY JOURNEY
          </span>

          <h2>
            You're making great progress!
          </h2>

          <p>
            You have completed 78% of your planned
            study goals this week.
          </p>

          <div className="banner-progress">

            <div>

              <span>
                Weekly progress
              </span>

              <strong>
                78%
              </strong>

            </div>

            <div className="mini-progress">
              <span></span>
            </div>

          </div>

        </div>

        <div className="large-progress-ring">

          <strong>
            78%
          </strong>

          <span>
            Complete
          </span>

        </div>

      </section>


      <section className="streak-section">

        <div className="streak-header">

          <div className="streak-title">

            <div className="streak-fire">
              🔥
            </div>

            <div>

              <h2>
                Your Study Streak
              </h2>

              <p>
                Consistency is the key to better study habits.
              </p>

            </div>

          </div>

          <div className="streak-number">
            7 days
          </div>

        </div>


        <div className="streak-days">

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
              className="streak-day"
              key={day}
            >

              <span className="streak-day-name">
                {day}
              </span>

              <div
                className={`streak-circle ${state}`}
              >
                {mark}
              </div>

            </div>

          ))}

        </div>


        <div className="streak-message">

          🔥 Amazing! You've studied consistently for 7 days.
          Complete today's goal to keep your streak alive!

        </div>

      </section>


      <section className="stats-grid">

        <div className="stat-card">

          <div className="stat-icon">
            🎯
          </div>

          <strong className="stat-number">
            {goals.length}
          </strong>

          <span className="stat-label">
            Active Goals
          </span>

          <span className="stat-change">
            ↑ 2 this week
          </span>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            ✓
          </div>

          <strong className="stat-number">
            12
          </strong>

          <span className="stat-label">
            Goals Completed
          </span>

          <span className="stat-change">
            ↑ 3 this week
          </span>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            🔥
          </div>

          <strong className="stat-number">
            7
          </strong>

          <span className="stat-label">
            Study Streak
          </span>

          <span className="stat-change">
            Keep going!
          </span>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            ◷
          </div>

          <strong className="stat-number">
            4.5h
          </strong>

          <span className="stat-label">
            Study Time
          </span>

          <span className="stat-change">
            ↑ 1.2h this week
          </span>

        </div>

      </section>


      <section className="dashboard-cards">

        <div className="dashboard-card">

          <div className="card-heading">

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


          <div className="task-list">

            <div className="task-item completed">

              <div className="task-check">
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

            </div>


            <div className="task-item completed">

              <div className="task-check">
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

            </div>


            <div className="task-item">

              <div className="task-check"></div>

              <div>

                <strong>
                  Review SQL joins
                </strong>

                <small>
                  Database Systems
                </small>

              </div>

            </div>


            <div className="task-item">

              <div className="task-check"></div>

              <div>

                <strong>
                  Practice 10 questions
                </strong>

                <small>
                  Database Systems
                </small>

              </div>

            </div>

          </div>

        </div>


        <div className="dashboard-card">

          <div className="card-heading">

            <div>

              <span>
                GOALS
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


          <div className="goal-progress-list">

            {goals.slice(0, 4).map((goal) => (

              <div
                className="goal-progress-item"
                key={goal.id}
              >

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


                <div className="mini-progress">

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


      <section className="dashboard-bottom">

        <div className="dashboard-card weekly-chart">

          <div className="card-heading">

            <div>

              <span>
                CONSISTENCY
              </span>

              <h2>
                Weekly Study Activity
              </h2>

            </div>

          </div>


          <div className="simple-chart">

            {[60, 80, 45, 90, 70, 55, 85].map(
              (height, index) => (

                <div
                  className="chart-column"
                  key={index}
                >

                  <div
                    className="chart-bar"
                    style={{
                      height: `${height}%`,
                    }}
                  ></div>

                  <span>
                    {["M", "T", "W", "T", "F", "S", "S"][index]}
                  </span>

                </div>

              )
            )}

          </div>

        </div>


        <div className="dashboard-card quick-actions">

          <div className="card-heading">

            <div>

              <span>
                ACTIONS
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
            Create New Goal
          </button>


          <button
            onClick={() => navigate("activity")}
          >
            <span>◷</span>
            Log Study Activity
          </button>


          <button
            onClick={() => navigate("reports")}
          >
            <span>▥</span>
            View Progress Report
          </button>

        </div>

      </section>

    </DashboardLayout>
  );
}

export default DashboardPage;