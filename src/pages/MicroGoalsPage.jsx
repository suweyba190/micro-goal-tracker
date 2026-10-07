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
    totalGoals > 0
      ? Math.round((completedMicroGoals / totalGoals) * 100)
      : 0;

  return (
    <DashboardLayout
      navigate={navigate}
      setShowProfile={setShowProfile}
      activePage="microgoals"
    >

      <div className="micro-premium-page">

        {/* =========================
            HERO
        ========================= */}

        <section className="micro-hero">

          <div className="micro-hero-content">

            <span className="micro-eyebrow">
              DAILY MICRO-GOALS
            </span>

            <h1>
              Small steps.
              <br />
              <span>Real progress.</span>
            </h1>

            <p>
              Complete one small action at a time and
              keep moving towards your academic goals.
            </p>

          </div>


          {/* PROGRESS */}

          <div className="micro-hero-progress">

            <div className="micro-progress-ring">

              <div>
                <strong>
                  {progress}%
                </strong>

                <span>
                  COMPLETE
                </span>
              </div>

            </div>

            <div className="micro-progress-count">
              {completedMicroGoals} of {totalGoals} completed
            </div>

          </div>

        </section>


        {/* =========================
            CHECKLIST
        ========================= */}

        <section className="micro-main">

          <div className="micro-checklist-card">

            <div className="micro-card-heading">

              <div>

                <span>
                  TODAY
                </span>

                <h2>
                  Your Checklist
                </h2>

                <p>
                  Small actions that move your goals forward.
                </p>

              </div>

              <div className="micro-count-badge">
                {completedMicroGoals}/{totalGoals}
              </div>

            </div>


            <div className="micro-list">

              {microGoals.length > 0 ? (

                microGoals.map((goal, index) => (

                  <div
                    key={goal.id}
                    className={`micro-premium-item ${
                      goal.completed
                        ? "micro-item-completed"
                        : ""
                    }`}
                    onClick={() =>
                      toggleMicroGoal(goal.id)
                    }
                  >

                    <div className="micro-item-number">
                      0{index + 1}
                    </div>


                    <div
                      className={`micro-premium-checkbox ${
                        goal.completed
                          ? "checked"
                          : ""
                      }`}
                    >
                      {goal.completed ? "✓" : ""}
                    </div>


                    <div className="micro-item-content">

                      <h3>
                        {goal.title}
                      </h3>

                      <p>
                        {goal.completed
                          ? "Completed — great job!"
                          : "Complete this step today"}
                      </p>

                    </div>


                    <div
                      className={`micro-item-status ${
                        goal.completed
                          ? "completed-status"
                          : ""
                      }`}
                    >
                      {goal.completed
                        ? "Completed"
                        : "To do"}
                    </div>

                  </div>

                ))

              ) : (

                <div className="micro-empty">

                  <div>
                    ✦
                  </div>

                  <h3>
                    No micro-goals yet
                  </h3>

                  <p>
                    Break one of your academic goals
                    into smaller steps to get started.
                  </p>

                  <button
                    onClick={() => navigate("goals")}
                  >
                    View Goals →
                  </button>

                </div>

              )}

            </div>

          </div>


          {/* =========================
              SIDE PANEL
          ========================= */}

          <aside className="micro-side-panel">

            <div className="micro-motivation-card">

              <div className="micro-motivation-symbol">
                ✦
              </div>

              <span>
                KEEP GOING
              </span>

              <h2>
                One step at a time.
              </h2>

              <p>
                You've already completed{" "}
                <strong>
                  {completedMicroGoals}
                </strong>{" "}
                {completedMicroGoals === 1
                  ? "step"
                  : "steps"}{" "}
                today.
              </p>

              <div className="micro-side-progress">

                <span
                  style={{
                    width: `${progress}%`,
                  }}
                ></span>

              </div>

              <small>
                {progress}% of today's micro-goals complete
              </small>

            </div>


            <div className="micro-tip-card">

              <span>
                STUDY TIP
              </span>

              <h3>
                Focus on the next task, not the whole journey.
              </h3>

              <p>
                Breaking large academic goals into smaller
                actions makes them easier to start and complete.
              </p>

            </div>


            <button
              className="micro-back-button"
              onClick={() => navigate("goals")}
            >
              ← Back to Goals
            </button>

          </aside>

        </section>

      </div>

    </DashboardLayout>
  );
}

export default MicroGoalsPage;