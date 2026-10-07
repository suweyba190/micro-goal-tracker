import DashboardLayout from "../components/DashboardLayout";

function ReportsPage({
  navigate,
  goals,
  setShowProfile,
}) {

  const completedGoals =
    goals.filter(
      (goal) => goal.progress === 100
    ).length;


  const averageProgress =
    goals.length > 0
      ? Math.round(
          goals.reduce(
            (total, goal) =>
              total + goal.progress,
            0
          ) / goals.length
        )
      : 0;


  return (

    <DashboardLayout
      navigate={navigate}
      setShowProfile={setShowProfile}
    >

      <section className="goal-page-banner">

        <div>

          <span>
            PROGRESS REPORT
          </span>

          <h2>
            My Progress
          </h2>

          <p>
            Review your academic goal progress
            and study performance.
          </p>

        </div>

      </section>


      <section className="report-summary">

        <div className="report-card">

          <strong>
            {goals.length}
          </strong>

          <span>
            Total Goals
          </span>

        </div>


        <div className="report-card">

          <strong>
            {completedGoals}
          </strong>

          <span>
            Completed Goals
          </span>

        </div>


        <div className="report-card">

          <strong>
            {averageProgress}%
          </strong>

          <span>
            Average Progress
          </span>

        </div>

      </section>


      <section className="report-goals">

        <h2>
          Goal Progress
        </h2>


        {goals.map((goal) => (

          <div
            className="report-goal"
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


            <div className="report-progress">

              <div className="mini-progress">

                <span
                  style={{
                    width: `${goal.progress}%`
                  }}
                ></span>

              </div>

              <strong>
                {goal.progress}%
              </strong>

            </div>

          </div>

        ))}

      </section>

    </DashboardLayout>

  );
}

export default ReportsPage;