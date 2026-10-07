import DashboardLayout from "../components/DashboardLayout";

function ActivityPage({
  navigate,
  activities,
  activityForm,
  setActivityForm,
  handleActivitySubmit,
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
            STUDY ACTIVITY
          </span>

          <h2>
            Activity Tracking
          </h2>

          <p>
            Record your study sessions and monitor
            your study consistency.
          </p>

        </div>

      </section>


      <section className="activity-section">

        <form
          className="activity-form"
          onSubmit={handleActivitySubmit}
        >

          <div className="form-group">

            <label>
              Activity
            </label>

            <input
              type="text"
              placeholder="e.g. Database Systems"
              value={activityForm.title}
              onChange={(e) =>
                setActivityForm({
                  ...activityForm,
                  title: e.target.value
                })
              }
            />

          </div>


          <div className="form-row">

            <div className="form-group">

              <label>
                Duration
              </label>

              <input
                type="text"
                placeholder="e.g. 1 hr 30 min"
                value={activityForm.duration}
                onChange={(e) =>
                  setActivityForm({
                    ...activityForm,
                    duration: e.target.value
                  })
                }
              />

            </div>


            <div className="form-group">

              <label>
                Date
              </label>

              <input
                type="date"
                value={activityForm.date}
                onChange={(e) =>
                  setActivityForm({
                    ...activityForm,
                    date: e.target.value
                  })
                }
              />

            </div>

          </div>


          <button
            type="submit"
            className="primary-button"
          >
            Save Activity
          </button>

        </form>


        <div className="activity-history">

          <h2>
            Recent Activities
          </h2>


          {activities.map((activity) => (

            <div
              className="activity-card"
              key={activity.id}
            >

              <div>

                <strong>
                  {activity.title}
                </strong>

                <span>
                  {activity.date}
                </span>

              </div>


              <span>
                {activity.duration}
              </span>

            </div>

          ))}

        </div>

      </section>

    </DashboardLayout>
  );
}

export default ActivityPage;