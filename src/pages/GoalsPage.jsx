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


  return (
    <DashboardLayout
      navigate={navigate}
      setShowProfile={setShowProfile}
    >

      <section className="goal-page-banner">

        <div>

          <span>
            ACADEMIC GOALS
          </span>

          <h2>
            My Goals
          </h2>

          <p>
            Organize your academic targets and track your progress.
          </p>

        </div>


        <button
          className="primary-button"
          onClick={() => navigate("createGoal")}
        >
          + Create Goal
        </button>

      </section>


      {/* SUMMARY */}

      <section className="goal-summary">

        <div>

          <strong>
            {goals.length}
          </strong>

          <span>
            Total Goals
          </span>

        </div>


        <div>

          <strong>
            {
              goals.filter(
                (g) => g.progress === 100
              ).length
            }
          </strong>

          <span>
            Completed
          </span>

        </div>


        <div>

          <strong>
            {
              goals.filter(
                (g) =>
                  g.progress > 0 &&
                  g.progress < 100
              ).length
            }
          </strong>

          <span>
            In Progress
          </span>

        </div>

      </section>


      {/* GOALS */}

      <section className="goals-section">

        <div className="section-top">

          <div>

            <span>
              YOUR GOALS
            </span>

            <h2>
              Academic Goals
            </h2>

          </div>


          {/* WORKING FILTER */}

          <select
            className="filter-select"
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


        <div className="goal-grid">

          {filteredGoals.length > 0 ? (

            filteredGoals.map((goal) => (

              <div
                className="goal-card"
                key={goal.id}
              >

                <div className="goal-card-top">

                  <span
                    className={`priority ${goal.priority.toLowerCase()}`}
                  >
                    {goal.priority}
                  </span>

                  <button className="goal-menu">
                    ⋮
                  </button>

                </div>


                <h3>
                  {goal.title}
                </h3>


                <span className="goal-subject">
                  {goal.subject}
                </span>


                <p>
                  {goal.description}
                </p>


                <div className="goal-progress">

                  <div>

                    <span>
                      Progress
                    </span>

                    <strong>
                      {goal.progress}%
                    </strong>

                  </div>


                  <div className="mini-progress">

                    <span
                      style={{
                        width: `${goal.progress}%`,
                      }}
                    ></span>

                  </div>

                </div>


                <div className="goal-card-footer">

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

            <div className="empty-goals">

              <div>
                🎯
              </div>

              <h3>
                No goals found
              </h3>

              <p>
                There are no goals in this category yet.
              </p>

              <button
                className="primary-button"
                onClick={() => navigate("createGoal")}
              >
                Create a Goal →
              </button>

            </div>

          )}


          {/* ADD GOAL CARD */}

          {filter === "All Goals" && (

            <button
              className="add-goal-card"
              onClick={() => navigate("createGoal")}
            >

              <span>
                ＋
              </span>

              <strong>
                Create a new goal
              </strong>

              <small>
                Break your academic target into smaller steps.
              </small>

            </button>

          )}

        </div>

      </section>

    </DashboardLayout>
  );
}

export default GoalsPage;