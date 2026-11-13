
import DashboardLayout from "../components/DashboardLayout";

function ReportsPage({
  navigate,
  goals = [],
  microGoals = [],
  activities = [],
  setShowProfile,
}) {
  // ACADEMIC GOALS
  const totalGoals = goals.length;

  const completedGoals = goals.filter(
    (goal) => Number(goal.progress) === 100
  ).length;

  const averageProgress =
    totalGoals > 0
      ? Math.round(
          goals.reduce(
            (sum, goal) => sum + (Number(goal.progress) || 0),
            0
          ) / totalGoals
        )
      : 0;

  const inProgressGoals = goals.filter(
    (goal) =>
      Number(goal.progress) > 0 &&
      Number(goal.progress) < 100
  ).length;

  // MICRO-GOALS
  const totalMicroGoals = microGoals.length;

  const completedMicroGoals = microGoals.filter(
    (goal) =>
      goal.completed === true ||
      goal.completed === 1
  ).length;

  const remainingMicroGoals =
    totalMicroGoals - completedMicroGoals;

  const microGoalProgress =
    totalMicroGoals > 0
      ? Math.round(
          (completedMicroGoals / totalMicroGoals) * 100
        )
      : 0;

  // STUDY ACTIVITIES
  const totalActivities = activities.length;

  const totalStudyMinutes = activities.reduce(
    (sum, activity) =>
      sum +
      (Number(
        activity.durationMinutes ??
        activity.duration_minutes ??
        activity.minutes
      ) || 0),
    0
  );

  const studyHours = Math.floor(totalStudyMinutes / 60);
  const remainingMinutes = totalStudyMinutes % 60;

  const formatStudyTime = () => {
    if (studyHours === 0) {
      return `${remainingMinutes} min`;
    }

    if (remainingMinutes === 0) {
      return `${studyHours} hr`;
    }

    return `${studyHours} hr ${remainingMinutes} min`;
  };

  return (
    <DashboardLayout
      navigate={navigate}
      setShowProfile={setShowProfile}
      activePage="reports"
    >
      <div className="reports-premium-page">

        {/* HERO */}

        <section className="reports-hero">

          <div className="reports-hero-content">

            <span className="reports-eyebrow">
              PROGRESS ANALYTICS
            </span>

            <h1>
              See your progress.
              <br />
              <span>Keep moving forward.</span>
            </h1>

            <p>
              Understand how consistently you're progressing
              towards your academic goals and celebrate every
              step forward.
            </p>

          </div>

          <div className="reports-hero-score">

            <span>OVERALL</span>

            <strong>{averageProgress}%</strong>

            <small>average progress</small>

          </div>

        </section>


        {/* ACADEMIC GOAL STATISTICS */}

        <section className="report-premium-stats">

          <div className="report-premium-stat">

            <div className="report-stat-top">
              <span>🎯</span>
              <small>TOTAL</small>
            </div>

            <strong>{totalGoals}</strong>

            <p>Academic Goals</p>

          </div>

          <div className="report-premium-stat">

            <div className="report-stat-top">
              <span>✓</span>
              <small>DONE</small>
            </div>

            <strong>{completedGoals}</strong>

            <p>Completed Goals</p>

          </div>

          <div className="report-premium-stat report-stat-highlight">

            <div className="report-stat-top">
              <span>◷</span>
              <small>ACTIVE</small>
            </div>

            <strong>{inProgressGoals}</strong>

            <p>Goals In Progress</p>

          </div>

          <div className="report-premium-stat">

            <div className="report-stat-top">
              <span>↗</span>
              <small>AVERAGE</small>
            </div>

            <strong>{averageProgress}%</strong>

            <p>Overall Progress</p>

          </div>

        </section>


        {/* MICRO-GOAL STATISTICS */}

        <section className="report-premium-stats">

          <div className="report-premium-stat">

            <div className="report-stat-top">
              <span>📝</span>
              <small>TOTAL</small>
            </div>

            <strong>{totalMicroGoals}</strong>

            <p>Total Micro-Goals</p>

          </div>

          <div className="report-premium-stat">

            <div className="report-stat-top">
              <span>✓</span>
              <small>COMPLETED</small>
            </div>

            <strong>{completedMicroGoals}</strong>

            <p>Completed Micro-Goals</p>

          </div>

          <div className="report-premium-stat report-stat-highlight">

            <div className="report-stat-top">
              <span>◷</span>
              <small>REMAINING</small>
            </div>

            <strong>{remainingMicroGoals}</strong>

            <p>Remaining Micro-Goals</p>

          </div>

          <div className="report-premium-stat">

            <div className="report-stat-top">
              <span>↗</span>
              <small>PROGRESS</small>
            </div>

            <strong>{microGoalProgress}%</strong>

            <p>Micro-Goal Completion</p>

          </div>

        </section>


        {/* STUDY ACTIVITY SUMMARY */}

        <section className="reports-progress-card">

          <div className="reports-progress-heading">

            <div>

              <span>STUDY ACTIVITY</span>

              <h2>Your Study Summary</h2>

              <p>
                An overview of the study sessions you have recorded.
              </p>

            </div>

          </div>

          <div className="report-premium-stats">

            <div className="report-premium-stat">

              <div className="report-stat-top">
                <span>◷</span>
                <small>TOTAL TIME</small>
              </div>

              <strong>{formatStudyTime()}</strong>

              <p>Total Study Time</p>

            </div>

            <div className="report-premium-stat">

              <div className="report-stat-top">
                <span>📚</span>
                <small>SESSIONS</small>
              </div>

              <strong>{totalActivities}</strong>

              <p>Recorded Sessions</p>

            </div>

          </div>

          {activities.length > 0 ? (

            <div className="reports-goal-list">

              {activities.map((activity, index) => (

                <div
                  className="reports-goal-item"
                  key={activity.id ?? activity.activity_id ?? index}
                >

                  <div className="reports-goal-number">
                    0{index + 1}
                  </div>

                  <div className="reports-goal-info">

                    <div className="reports-goal-title">

                      <div>

                        <h3>
                          {activity.title ||
                            activity.description ||
                            activity.activity_description ||
                            "Study Session"}
                        </h3>

                        <span>
                          {activity.date ||
                            activity.activity_date ||
                            "Recorded activity"}
                        </span>

                      </div>

                      <strong>
                        {activity.duration ||
                          activity.duration_text ||
                          (
                            Number(
                              activity.durationMinutes ??
                              activity.duration_minutes ??
                              activity.minutes
                            ) > 0
                              ? `${Number(
                                  activity.durationMinutes ??
                                  activity.duration_minutes ??
                                  activity.minutes
                                )} min`
                              : "Recorded"
                          )}
                      </strong>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="reports-empty">

              <div>📚</div>

              <h3>No study activities yet</h3>

              <p>
                Record your first study session to see your
                study time and activity here.
              </p>

              <button onClick={() => navigate("activity")}>
                Record Study Activity →
              </button>

            </div>

          )}

        </section>


        {/* ACADEMIC GOAL PROGRESS */}

        <section className="reports-progress-card">

          <div className="reports-progress-heading">

            <div>

              <span>PERFORMANCE</span>

              <h2>Goal Progress</h2>

              <p>
                Your current progress across all academic goals.
              </p>

            </div>

            <div className="reports-total-badge">
              {totalGoals} goals
            </div>

          </div>

          <div className="reports-goal-list">

            {goals.length > 0 ? (

              goals.map((goal, index) => (

                <div
                  className="reports-goal-item"
                  key={goal.id}
                >

                  <div className="reports-goal-number">
                    0{index + 1}
                  </div>

                  <div className="reports-goal-info">

                    <div className="reports-goal-title">

                      <div>

                        <h3>{goal.title}</h3>

                        <span>{goal.subject}</span>

                      </div>

                      <strong>{goal.progress}%</strong>

                    </div>

                    <div className="reports-progress-track">

                      <div
                        className="reports-progress-fill"
                        style={{
                          width: `${goal.progress}%`,
                        }}
                      ></div>

                    </div>

                    <div className="reports-goal-footer">

                      <span>Target: {goal.date}</span>

                      <span
                        className={
                          goal.progress === 100
                            ? "report-complete"
                            : ""
                        }
                      >
                        {goal.progress === 100
                          ? "Completed"
                          : "In progress"}
                      </span>

                    </div>

                  </div>

                </div>

              ))

            ) : (

              <div className="reports-empty">

                <div>📊</div>

                <h3>No goals to report yet</h3>

                <p>
                  Create your first academic goal to start
                  tracking your progress.
                </p>

                <button
                  onClick={() => navigate("createGoal")}
                >
                  Create Goal →
                </button>

              </div>

            )}

          </div>

        </section>


        {/* INSIGHT */}

        <section className="reports-insight-card">

          <div className="reports-insight-icon">
            ✦
          </div>

          <div>

            <span>STUDY INSIGHT</span>

            <h2>Small progress adds up.</h2>

            <p>
              Keep completing your micro-goals and recording
              your study activities. Consistent small actions
              help you move closer to completing your larger
              academic goals.
            </p>

          </div>

        </section>


        {/* ACTIONS */}

        <div className="reports-actions">

          <button
            onClick={() => navigate("microgoals")}
          >
            View Micro-Goals →
          </button>

          <button
            onClick={() => navigate("dashboard")}
          >
            ← Back to Dashboard
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default ReportsPage;
