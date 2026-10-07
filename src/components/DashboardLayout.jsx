function DashboardLayout({
  navigate,
  children,
  setShowProfile,
}) {
  return (
    <div className="dashboard-page">

      <aside className="dashboard-sidebar">

        <div className="sidebar-brand">

          <div className="brand-icon">
            ✓
          </div>

          <span>
            MicroGoal
          </span>

        </div>


        <div className="sidebar-section">

          <span className="sidebar-label">
            MAIN
          </span>


          <button
            className="sidebar-item"
            onClick={() => navigate("dashboard")}
          >
            <span>⌂</span>
            Dashboard
          </button>


          <button
            className="sidebar-item"
            onClick={() => navigate("goals")}
          >
            <span>🎯</span>
            My Goals
          </button>


          <button
            className="sidebar-item"
            onClick={() => navigate("microgoals")}
          >
            <span>✓</span>
            Micro-Goals
          </button>


          <button
            className="sidebar-item"
            onClick={() => navigate("activity")}
          >
            <span>◷</span>
            Activity
          </button>


          <button
            className="sidebar-item"
            onClick={() => navigate("reports")}
          >
            <span>▥</span>
            Reports
          </button>

        </div>


        <div className="sidebar-bottom">

          <button
            className="sidebar-profile"
            onClick={() => setShowProfile(true)}
          >

            <div className="profile-avatar">
              AS
            </div>

            <div>

              <strong>
                Ahmed
              </strong>

              <small>
                Student
              </small>

            </div>

          </button>

        </div>

      </aside>


      <main className="dashboard-main">

        <div className="dashboard-header">

          <div className="header-greeting">

            <h1>
              Good evening, Ahmed 👋
            </h1>

            <p>
              Keep going. Every small step counts.
            </p>

          </div>


          <button
            className="header-profile"
            onClick={() => setShowProfile(true)}
          >

            <div className="profile-avatar">
              AS
            </div>

          </button>

        </div>


        {children}

      </main>

    </div>
  );
}


export default DashboardLayout;