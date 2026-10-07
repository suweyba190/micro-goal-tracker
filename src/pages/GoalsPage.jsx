import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

function GoalsPage({
  navigate,
  goals,
  setShowProfile,
}) {
  const [filter, setFilter] = useState("All Goals");

  const filteredGoals = goals.filter((goal) => {
    if (filter === "Completed") {
      return goal.progress === 100;
    }

    if (filter === "In Progress") {
      return goal.progress > 0 && goal.progress < 100;
    }

    return true;
  });

  const completedGoals = goals.filter(
    (goal) => goal.progress === 100
  ).length;

  const inProgressGoals = goals.filter(
    (goal) =>
      goal.progress > 0 &&
      goal.progress < 100
  ).length;

  return (
    <DashboardLayout
      navigate={navigate}
      setShowProfile={setShowProfile}
    >

      {/* =========================
          PAGE HERO
      ========================= */}

      <section className="goals-hero">

        <div className="goals-hero-content">

          <span>
            ACADEMIC GOALS
          </span>

          <h1>
            Turn your plans
            <br />
            into <strong>progress.</strong>
          </h1>

          <p>
            Organize your academic targets, track your progress,
            and stay focused on what matters.
          </p>

        </div>


        <div className="goals-hero-action">

          <div className="goals-hero-circle">
            🎯
          </div>

          <button
            onClick={() => navigate("createGoal")}
          >
            ＋ Create Goal
          </button>

        </div>

      </section>


      {/* =========================
          SUMMARY
      ========================= */}

      <section className="goals-summary">

        <div className="goals-summary-card">

          <span className="summary-icon">
            🎯
          </span>

          <div>
            <strong>
              {goals.length}
            </strong>

            <span>
              Total Goals
            </span>
          </div>

        </div>


        <div className="goals-summary-card">

          <span className="summary-icon">
            ✓
          </span>

          <div>
            <strong>
              {completedGoals}
            </strong>

            <span>
              Completed
            </span>
          </div>

        </div>


        <div className="goals-summary-card summary-highlight">

          <span className="summary-icon">
            ◷
          </span>

          <div>
            <strong>
              {inProgressGoals}
            </strong>

            <span>
              In Progress
            </span>
          </div>

        </div>


        <div className="goals-summary-card">

          <span className="summary-icon">
            📈
          </span>

          <div>
            <strong>
              78%
            </strong>

            <span>
              Average Progress
            </span>
          </div>

        </div>

      </section>


      {/* =========================
          GOALS SECTION
      ========================= */}

      <section className="goals-main-section">

        <div className="goals-section-heading">

          <div>

            <span>
              YOUR GOALS
            </span>

            <h2>
              Academic Goals
            </h2>

          </div>


          <div className="goals-controls">

            <select
              className="goals-filter"
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
            >

              <option>
                All Goals
              </option>

              <option>
                In Progress
              </option>

              <option>
                Completed
              </option>

            </select>

          </div>

        </div>


        {/* GOAL GRID */}

        <div className="premium-goal-grid">

          {filteredGoals.length > 0 ? (

            filteredGoals.map((goal, index) => (

              <div
                className={`premium-goal-card goal-card-${index + 1}`}
                key={goal.id}
              >

                <div className="premium-goal-top">

                  <span
                    className={`premium-priority ${goal.priority.toLowerCase()}`}
                  >
                    {goal.priority}
                  </span>

                  <span className="goal-number">
                    0{index + 1}
                  </span>

                </div>


                <div className="premium-goal-content">

                  <span className="premium-goal-subject">
                    {goal.subject}
                  </span>

                  <h3>
                    {goal.title}
                  </h3>

                  <p>
                    {goal.description}
                  </p>

                </div>


                <div className="premium-goal-progress">

                  <div className="premium-progress-info">

                    <span>
                      Progress
                    </span>

                    <strong>
                      {goal.progress}%
                    </strong>

                  </div>

                  <div className="premium-progress-track">

                    <span
                      style={{
                        width: `${goal.progress}%`,
                      }}
                    ></span>

                  </div>

                </div>


                <div className="premium-goal-footer">

                  <span>
                    📅 {goal.date}
                  </span>

                  <button
                    onClick={() =>
                      navigate("microgoals")
                    }
                  >
                    Micro-goals →
                  </button>

                </div>

              </div>

            ))

          ) : (

            <div className="premium-empty-goals">

              <div className="empty-goal-icon">
                🎯
              </div>

              <h3>
                No goals found
              </h3>

              <p>
                There are no goals in this category yet.
              </p>

              <button
                onClick={() => navigate("createGoal")}
              >
                Create a Goal →
              </button>

            </div>

          )}


          {/* ADD GOAL */}

          {filter === "All Goals" && (

            <button
              className="premium-add-goal"
              onClick={() => navigate("createGoal")}
            >

              <div className="add-goal-icon">
                ＋
              </div>

              <strong>
                Create a new goal
              </strong>

              <span>
                Start with a target and turn it
                into smaller achievable steps.
              </span>

              <b>
                Get started →
              </b>

            </button>

          )}

        </div>

      </section>

    </DashboardLayout>
  );
}

export default GoalsPage;