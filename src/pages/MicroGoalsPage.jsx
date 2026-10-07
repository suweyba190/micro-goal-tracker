import DashboardLayout from "../components/DashboardLayout";

function MicroGoalsPage({
  navigate,
  microGoals,
  toggleMicroGoal,
  completedMicroGoals,
  setShowProfile,
}) {
  return (
    <DashboardLayout
      navigate={navigate}
      setShowProfile={setShowProfile}
    >

      <section className="goal-page-banner">

        <div>

          <span>
            DAILY MICRO-GOALS
          </span>

          <h2>
            Micro-goals
          </h2>

          <p>
            Complete smaller steps to make steady
            progress toward your academic goals.
          </p>

        </div>

      </section>


      <section className="micro-goals-section">

        <div className="micro-summary">

          <strong>
            {completedMicroGoals}
          </strong>

          <span>
            of {microGoals.length} completed
          </span>

        </div>


        <div className="micro-goals-list">

          {microGoals.map((goal) => (

            <div
              className={`micro-goal-item ${
                goal.completed
                  ? "completed"
                  : ""
              }`}
              key={goal.id}
            >

              <button
                className="micro-checkbox"
                onClick={() =>
                  toggleMicroGoal(goal.id)
                }
              >
                {goal.completed
                  ? "✓"
                  : ""}
              </button>


              <span>
                {goal.title}
              </span>

            </div>

          ))}

        </div>


        <button
          className="secondary-button"
          onClick={() =>
            navigate("goals")
          }
        >
          ← Back to Goals
        </button>

      </section>

    </DashboardLayout>
  );
}

export default MicroGoalsPage;