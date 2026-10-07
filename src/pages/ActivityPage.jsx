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
      <div className="activity-page">

        {/* Header */}
        <div className="activity-header">
          <div>
            <p className="page-label">STUDY TRACKING</p>
            <h1>Activity</h1>
            <p className="page-description">
              Record your study sessions and keep track of the time you spend
              learning.
            </p>
          </div>

          <div className="activity-total">
            <span>◷</span>
            <div>
              <strong>{activities.length}</strong>
              <small>Sessions recorded</small>
            </div>
          </div>
        </div>

        {/* Add Activity */}
        <div className="activity-grid">

          <div className="activity-form-card">
            <div className="card-heading">
              <div className="activity-icon">◷</div>
              <div>
                <h2>Log Study Activity</h2>
                <p>Record a study session you've completed.</p>
              </div>
            </div>

            <form onSubmit={handleActivitySubmit}>

              <div className="form-group">
                <label>Activity / Subject</label>
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
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Duration</label>
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
                  />
                </div>

                <div className="form-group">
                  <label>Date</label>
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

              <button className="save-activity-button" type="submit">
                + Save Activity
              </button>

            </form>
          </div>

          {/* Study Summary */}
          <div className="study-summary-card">
            <p className="summary-label">YOUR STUDY JOURNEY</p>
            <h2>Keep building your streak.</h2>
            <p>
              Every study session you record helps you understand your study
              habits and stay consistent.
            </p>

            <div className="summary-line">
              <span>Sessions</span>
              <strong>{activities.length}</strong>
            </div>

            <div className="summary-line">
              <span>Tracking</span>
              <strong>Active</strong>
            </div>
          </div>

        </div>

        {/* Recent Activity */}
        <div className="recent-activity-card">

          <div className="recent-heading">
            <div>
              <h2>Recent Activity</h2>
              <p>Your latest recorded study sessions.</p>
            </div>
          </div>

          <div className="activity-list">

            {activities.length === 0 ? (
              <div className="empty-activity">
                <div>◷</div>
                <h3>No activity recorded yet</h3>
                <p>Add your first study session above.</p>
              </div>
            ) : (
              activities.map((activity, index) => (
                <div className="activity-item" key={index}>

                  <div className="activity-circle">
                    ◷
                  </div>

                  <div className="activity-info">
                    <h3>{activity.title}</h3>
                    <p>{activity.date}</p>
                  </div>

                  <div className="activity-duration">
                    <strong>{activity.duration}</strong>
                    <span>Study time</span>
                  </div>

                </div>
              ))
            )}

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default ActivityPage;