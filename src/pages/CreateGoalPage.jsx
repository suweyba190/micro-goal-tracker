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

      <div className="create-goal-premium-page">

        {/* =========================
            HERO
        ========================= */}

        <section className="create-goal-hero">

          <div className="create-goal-hero-content">

            <span className="create-goal-eyebrow">
              NEW ACADEMIC GOAL
            </span>

            <h1>
              Start with a target.
              <br />
              <span>Build your progress.</span>
            </h1>

            <p>
              Define what you want to achieve, set a deadline,
              and turn your academic target into smaller actions.
            </p>

          </div>


          <div className="create-goal-hero-symbol">
            <div>🎯</div>
            <span>FOCUS</span>
          </div>

        </section>


        {/* =========================
            FORM AREA
        ========================= */}

        <section className="create-goal-layout">

          <div className="create-goal-form-card">

            <div className="create-goal-heading">

              <div>
                <span>GOAL DETAILS</span>

                <h2>
                  What do you want to achieve?
                </h2>

                <p>
                  Fill in the details below to create your
                  academic goal.
                </p>
              </div>

              <div className="create-goal-step">
                01
              </div>

            </div>


            <form
              className="create-goal-premium-form"
              onSubmit={handleCreateGoal}
            >

              {/* TITLE */}

              <div className="premium-form-group">

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
                  required
                />

                <small>
                  Give your goal a clear and specific name.
                </small>

              </div>


              {/* SUBJECT */}

              <div className="premium-form-group">

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
                  required
                />

              </div>


              {/* DATE + PRIORITY */}

              <div className="premium-form-row">

                <div className="premium-form-group">

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
                    required
                  />

                </div>


                <div className="premium-form-group">

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


              {/* DESCRIPTION */}

              <div className="premium-form-group">

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
                  rows="5"
                />

                <small>
                  Add a little more detail about your target.
                </small>

              </div>


              {/* ACTIONS */}

              <div className="create-goal-actions">

                <button
                  type="button"
                  className="create-goal-cancel"
                  onClick={() =>
                    navigate("goals")
                  }
                >
                  ← Cancel
                </button>


                <button
                  type="submit"
                  className="create-goal-submit"
                >
                  Create Goal
                  <span>→</span>
                </button>

              </div>

            </form>

          </div>


          {/* =========================
              SIDE INFORMATION
          ========================= */}

          <aside className="create-goal-side">

            <div className="goal-side-card">

              <div className="goal-side-icon">
                ✦
              </div>

              <span>
                WHY MICRO-GOALS?
              </span>

              <h2>
                Big goals become easier when you start small.
              </h2>

              <p>
                After creating your goal, break it into
                smaller daily micro-goals that you can
                complete one step at a time.
              </p>

              <div className="goal-side-line"></div>

              <div className="goal-side-stat">

                <strong>
                  01
                </strong>

                <div>
                  <b>
                    Set your target
                  </b>

                  <small>
                    Decide what you want to accomplish.
                  </small>
                </div>

              </div>


              <div className="goal-side-stat">

                <strong>
                  02
                </strong>

                <div>
                  <b>
                    Break it down
                  </b>

                  <small>
                    Turn the goal into smaller actions.
                  </small>
                </div>

              </div>


              <div className="goal-side-stat">

                <strong>
                  03
                </strong>

                <div>
                  <b>
                    Track progress
                  </b>

                  <small>
                    See how consistently you're improving.
                  </small>
                </div>

              </div>

            </div>

          </aside>

        </section>

      </div>

    </DashboardLayout>
  );
}

export default CreateGoalPage;