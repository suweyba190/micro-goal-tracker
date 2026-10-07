import DashboardLayout from "../components/DashboardLayout";

function CreateGoalPage({
  navigate,
  newGoal,
  setNewGoal,
  handleCreateGoal,
}) {

  return (

    <DashboardLayout
      navigate={navigate}
      setShowProfile={() => {}}
    >

      <section className="goal-page-banner">

        <div>

          <span>
            ACADEMIC GOAL
          </span>

          <h2>
            Create a New Goal
          </h2>

          <p>
            Set an academic target and break it
            into smaller achievable steps.
          </p>

        </div>

      </section>


      <section className="create-goal-section">

        <form
          className="create-goal-form"
          onSubmit={handleCreateGoal}
        >

          <div className="form-group">

            <label>
              Goal Title
            </label>

            <input
              type="text"
              placeholder="e.g. Complete Database Assignment"
              value={newGoal.title}
              onChange={(e) =>
                setNewGoal({
                  ...newGoal,
                  title: e.target.value
                })
              }
            />

          </div>


          <div className="form-group">

            <label>
              Subject
            </label>

            <input
              type="text"
              placeholder="e.g. Database Systems"
              value={newGoal.subject}
              onChange={(e) =>
                setNewGoal({
                  ...newGoal,
                  subject: e.target.value
                })
              }
            />

          </div>


          <div className="form-row">

            <div className="form-group">

              <label>
                Target Date
              </label>

              <input
                type="date"
                value={newGoal.date}
                onChange={(e) =>
                  setNewGoal({
                    ...newGoal,
                    date: e.target.value
                  })
                }
              />

            </div>


            <div className="form-group">

              <label>
                Priority
              </label>

              <select
                value={newGoal.priority}
                onChange={(e) =>
                  setNewGoal({
                    ...newGoal,
                    priority: e.target.value
                  })
                }
              >

                <option>
                  Low
                </option>

                <option>
                  Medium
                </option>

                <option>
                  High
                </option>

              </select>

            </div>

          </div>


          <div className="form-group">

            <label>
              Description
            </label>

            <textarea
              placeholder="Describe what you want to achieve..."
              value={newGoal.description}
              onChange={(e) =>
                setNewGoal({
                  ...newGoal,
                  description: e.target.value
                })
              }
            />

          </div>


          <div className="form-actions">

            <button
              type="button"
              className="secondary-button"
              onClick={() =>
                navigate("goals")
              }
            >
              Cancel
            </button>


            <button
              type="submit"
              className="primary-button"
            >
              Create Goal
            </button>

          </div>

        </form>

      </section>

    </DashboardLayout>

  );
}

export default CreateGoalPage;