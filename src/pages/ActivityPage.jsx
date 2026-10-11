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
      activePage="activity"
    >

      <div className="activity-premium-page">

        {/* =========================
            HERO
        ========================= */}

        <section className="activity-hero">

          <div className="activity-hero-content">

            <span className="activity-eyebrow">
              STUDY TRACKING
            </span>

            <h1>
              Track the time.
              <br />
              <span>Build the habit.</span>
            </h1>

            <p>
              Record your study sessions and understand
              how consistently you're investing in your learning.
            </p>

          </div>


          <div className="activity-hero-stat">

            <div className="activity-clock">
              ◷
            </div>

            <strong>
              {activities.length}
            </strong>

            <span>
              SESSIONS
            </span>

          </div>

        </section>


        {/* =========================
            MAIN GRID
        ========================= */}

        <section className="activity-main-grid">

          {/* LOG ACTIVITY */}

          <div className="activity-form-card">

            <div className="activity-form-heading">

              <div>

                <span>
                  RECORD SESSION
                </span>

                <h2>
                  Log Study Activity
                </h2>

                <p>
                  Record a study session you've completed.
                </p>

              </div>

              <div className="activity-form-number">
                01
              </div>

            </div>


            <form
              className="activity-premium-form"
              onSubmit={handleActivitySubmit}
            >

              <div className="activity-form-group">

                <label>
                  Activity / Subject
                </label>

                <input
                  type="text"
                  placeholder="e.g. Database Systems"
                  value={activityForm.title}
                  onChange={(e) =>
                    setActivityForm({
                      ...activityForm,
                      title: e.target.value,
                    })
                  }
                  required
                />

              </div>


              <div className="activity-form-row">

                <div className="activity-form-group">

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
                        duration: e.target.value,
                      })
                    }
                    required
                  />

                </div>


                <div className="activity-form-group">

                  <label>
                    Date
                  </label>

                  <input
                    type="date"
                    value={activityForm.date}
                    onChange={(e) =>
                      setActivityForm({
                        ...activityForm,
                        date: e.target.value,
                      })
                    }
                  />

                </div>

              </div>


              <button
                className="activity-save-button"
                type="submit"
              >
                Save Study Session
                <span>→</span>
              </button>

            </form>

          </div>


          {/* STUDY JOURNEY */}

          <div className="activity-journey-card">

            <div className="journey-symbol">
              ✦
            </div>

            <span>
              YOUR STUDY JOURNEY
            </span>

            <h2>
              Keep building your streak.
            </h2>

            <p>
              Every session you record helps you
              understand your study habits and stay
              consistent.
            </p>


            <div className="journey-divider"></div>


            <div className="journey-stat">

              <span>
                Sessions recorded
              </span>

              <strong>
                {activities.length}
              </strong>

            </div>


            <div className="journey-stat">

              <span>
                Tracking status
              </span>

              <strong>
                Active
              </strong>

            </div>


            <div className="journey-message">
              <span>✓</span>
              Keep showing up.
            </div>

          </div>

        </section>


        {/* =========================
            RECENT ACTIVITY
        ========================= */}

        <section className="recent-activity-premium">

          <div className="recent-activity-heading">

            <div>

              <span>
                STUDY HISTORY
              </span>

              <h2>
                Recent Activity
              </h2>

              <p>
                Your latest recorded study sessions.
              </p>

            </div>

            <div className="recent-count">
              {activities.length} sessions
            </div>

          </div>


          <div className="premium-activity-list">

            {activities.length === 0 ? (

              <div className="activity-empty">

                <div className="empty-activity-icon">
                  ◷
                </div>

                <h3>
                  No activity recorded yet
                </h3>

                <p>
                  Add your first study session above.
                </p>

              </div>

            ) : (

              activities.map((activity, index) => (

                <div
                  className="premium-activity-item"
                  key={activity.id || index}
                >

                  <div className="activity-index">
                    0{index + 1}
                  </div>


                  <div className="premium-activity-icon">
                    ◷
                  </div>


                  <div className="premium-activity-info">

                    <h3>
                      {activity.title}
                    </h3>

                    <p>
                      {activity.date}
                    </p>

                  </div>


                  <div className="premium-activity-duration">

                    <strong>
                      {activity.duration}
                    </strong>

                    <span>
                      Study time
                    </span>

                  </div>

                </div>

              ))

            )}

          </div>

        </section>


        {/* BACK */}

        <button
          className="activity-back-button"
          onClick={() => navigate("dashboard")}
        >
          ← Back to Dashboard
        </button>

      </div>

    </DashboardLayout>
  );
}

export default ActivityPage;