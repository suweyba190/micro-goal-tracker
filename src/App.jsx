import { useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./components/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
function App() {
  const [page, setPage] = useState("home");
  const [showProfile, setShowProfile] = useState(false);

  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Complete Database Assignment",
      subject: "Database Systems",
      date: "Oct 08, 2026",
      priority: "High",
      progress: 75,
      description: "Complete the database normalization assignment.",
    },
    {
      id: 2,
      title: "Revise Power BI",
      subject: "Business Intelligence",
      date: "Oct 10, 2026",
      priority: "Medium",
      progress: 50,
      description: "Revise Power BI dashboards and data visualization.",
    },
    {
      id: 3,
      title: "Study Regression",
      subject: "Data Analytics",
      date: "Oct 12, 2026",
      priority: "High",
      progress: 30,
      description: "Review regression concepts and practice questions.",
    },
    {
      id: 4,
      title: "Final Year Project",
      subject: "Project",
      date: "Oct 20, 2026",
      priority: "High",
      progress: 100,
      description: "Continue development of the Micro-Goal Tracker.",
    },
  ]);

  const [microGoals, setMicroGoals] = useState([
    {
      id: 1,
      title: "Read Chapter 4",
      subject: "Database Systems",
      completed: true,
    },
    {
      id: 2,
      title: "Complete normalization exercises",
      subject: "Database Systems",
      completed: true,
    },
    {
      id: 3,
      title: "Review SQL joins",
      subject: "Database Systems",
      completed: false,
    },
    {
      id: 4,
      title: "Practice 10 SQL questions",
      subject: "Database Systems",
      completed: false,
    },
  ]);

  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "Database Systems",
      duration: "1 hr 30 min",
      date: "Today",
    },
    {
      id: 2,
      title: "Business Intelligence",
      duration: "1 hr",
      date: "Yesterday",
    },
    {
      id: 3,
      title: "Final Year Project",
      duration: "2 hrs",
      date: "Sep 30, 2026",
    },
  ]);

  const [newGoal, setNewGoal] = useState({
    title: "",
    subject: "",
    date: "",
    priority: "Medium",
    description: "",
  });

  const [activityForm, setActivityForm] = useState({
    title: "",
    duration: "",
    date: "",
  });

  const navigate = (destination) => {
    setPage(destination);
    setShowProfile(false);
    window.scrollTo(0, 0);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Account created successfully!");
    navigate("login");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("dashboard");
  };

  const handleCreateGoal = (e) => {
    e.preventDefault();

    if (!newGoal.title || !newGoal.subject || !newGoal.date) {
      alert("Please fill in the goal title, subject and deadline.");
      return;
    }

    const goal = {
      id: Date.now(),
      title: newGoal.title,
      subject: newGoal.subject,
      date: newGoal.date,
      priority: newGoal.priority,
      progress: 0,
      description:
        newGoal.description || "No description added yet.",
    };

    setGoals([...goals, goal]);

    setNewGoal({
      title: "",
      subject: "",
      date: "",
      priority: "Medium",
      description: "",
    });

    navigate("goals");
  };

  const toggleMicroGoal = (id) => {
    setMicroGoals(
      microGoals.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const handleActivitySubmit = (e) => {
    e.preventDefault();

    if (!activityForm.title || !activityForm.duration) {
      alert("Please enter the activity and duration.");
      return;
    }

    const activity = {
      id: Date.now(),
      title: activityForm.title,
      duration: activityForm.duration,
      date: activityForm.date || "Today",
    };

    setActivities([activity, ...activities]);

    setActivityForm({
      title: "",
      duration: "",
      date: "",
    });

    alert("Study activity saved!");
  };

  const completedMicroGoals = microGoals.filter(
    (task) => task.completed
  ).length;

  return (
    <>
      {page === "home" && <HomePage navigate={navigate} />}

      {page === "register" && (
        <RegisterPage
          navigate={navigate}
          handleRegister={handleRegister}
        />
      )}

      {page === "login" && (
        <LoginPage
          navigate={navigate}
          handleLogin={handleLogin}
        />
      )}

      {page === "dashboard" && (
        <DashboardPage
          navigate={navigate}
          goals={goals}
          setShowProfile={setShowProfile}
        />
      )}

      {page === "goals" && (
        <GoalsPage
          navigate={navigate}
          goals={goals}
          setShowProfile={setShowProfile}
        />
      )}

      {page === "createGoal" && (
        <CreateGoalPage
          navigate={navigate}
          newGoal={newGoal}
          setNewGoal={setNewGoal}
          handleCreateGoal={handleCreateGoal}
        />
      )}

      {page === "microgoals" && (
        <MicroGoalsPage
          navigate={navigate}
          microGoals={microGoals}
          toggleMicroGoal={toggleMicroGoal}
          completedMicroGoals={completedMicroGoals}
          setShowProfile={setShowProfile}
        />
      )}

      {page === "activity" && (
        <ActivityPage
          navigate={navigate}
          activities={activities}
          activityForm={activityForm}
          setActivityForm={setActivityForm}
          handleActivitySubmit={handleActivitySubmit}
          setShowProfile={setShowProfile}
        />
      )}

      {page === "reports" && (
        <ReportsPage
          navigate={navigate}
          goals={goals}
          setShowProfile={setShowProfile}
        />
      )}

      {showProfile && (
        <ProfileModal
          close={() => setShowProfile(false)}
          logout={() => {
            setShowProfile(false);
            navigate("login");
          }}
        />
      )}
    </>
  );
}



/* =====================================================
   GOALS PAGE — NOW WITH WORKING FILTER
===================================================== */

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


/* =====================================================
   CREATE GOAL
===================================================== */

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
            ACADEMIC GOALS
          </span>

          <h2>
            Create New Goal
          </h2>

          <p>
            Define an academic goal and start breaking it into micro-goals.
          </p>

        </div>

      </section>


      <section className="create-goal-section">

        <form
          className="create-goal-form"
          onSubmit={handleCreateGoal}
        >

          <label>

            Goal Title

            <input
              type="text"
              placeholder="e.g. Complete Database Assignment"
              value={newGoal.title}
              onChange={(e) =>
                setNewGoal({
                  ...newGoal,
                  title: e.target.value,
                })
              }
              required
            />

          </label>


          <label>

            Subject

            <input
              type="text"
              placeholder="e.g. Database Systems"
              value={newGoal.subject}
              onChange={(e) =>
                setNewGoal({
                  ...newGoal,
                  subject: e.target.value,
                })
              }
              required
            />

          </label>


          <label>

            Deadline

            <input
              type="date"
              value={newGoal.date}
              onChange={(e) =>
                setNewGoal({
                  ...newGoal,
                  date: e.target.value,
                })
              }
              required
            />

          </label>


          <label>

            Priority

            <select
              value={newGoal.priority}
              onChange={(e) =>
                setNewGoal({
                  ...newGoal,
                  priority: e.target.value,
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

          </label>


          <label>

            Description

            <textarea
              placeholder="Describe what you want to achieve..."
              value={newGoal.description}
              onChange={(e) =>
                setNewGoal({
                  ...newGoal,
                  description: e.target.value,
                })
              }
            ></textarea>

          </label>


          <div className="form-buttons">

            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("goals")}
            >
              Cancel
            </button>


            <button
              type="submit"
              className="primary-button"
            >
              Save Goal →
            </button>

          </div>

        </form>

      </section>

    </DashboardLayout>
  );
}


/* =====================================================
   MICRO GOALS
===================================================== */

function MicroGoalsPage({
  navigate,
  microGoals,
  toggleMicroGoal,
  completedMicroGoals,
  setShowProfile,
}) {

  const progress = Math.round(
    (completedMicroGoals / microGoals.length) * 100
  );

  return (
    <DashboardLayout
      navigate={navigate}
      setShowProfile={setShowProfile}
    >

      <section className="micro-banner">

        <div>

          <span>
            DATABASE SYSTEMS
          </span>

          <h2>
            Complete Database Assignment
          </h2>

          <p>
            Complete these small tasks to achieve your main goal.
          </p>

        </div>


        <div className="micro-banner-progress">

          <strong>
            {progress}%
          </strong>

          <span>
            Today
          </span>

        </div>

      </section>


      <section className="micro-content-grid">

        <div className="micro-list-card">

          <div className="card-heading">

            <div>

              <span>
                TODAY'S PLAN
              </span>

              <h2>
                Micro-Goals
              </h2>

            </div>


            <span className="task-count">
              {completedMicroGoals}/{microGoals.length}
            </span>

          </div>


          <div className="micro-goal-list">

            {microGoals.map((task) => (

              <div
                className={`micro-task ${
                  task.completed ? "completed" : ""
                }`}
                key={task.id}
              >

                <button
                  className="micro-check"
                  onClick={() =>
                    toggleMicroGoal(task.id)
                  }
                >
                  {task.completed ? "✓" : ""}
                </button>


                <div className="micro-task-content">

                  <strong>
                    {task.title}
                  </strong>

                  <span>
                    {task.subject}
                  </span>

                </div>


                <span className="micro-status">

                  {task.completed
                    ? "Completed"
                    : "Pending"}

                </span>

              </div>

            ))}

          </div>

        </div>


        <div className="daily-progress-card">

          <span>
            TODAY'S PROGRESS
          </span>


          <div className="daily-circle">

            <strong>
              {progress}%
            </strong>

            <span>
              Complete
            </span>

          </div>


          <h3>

            {progress === 100
              ? "Great work! 🎉"
              : "Keep going! 💪"}

          </h3>


          <p>
            Small progress every day creates consistent
            study habits.
          </p>


          <button
            className="primary-button"
            onClick={() => navigate("activity")}
          >
            Log Study Activity
          </button>

        </div>

      </section>

    </DashboardLayout>
  );
}


/* =====================================================
   ACTIVITY
===================================================== */

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

      <section className="activity-banner">

        <div>

          <span>
            STUDY TRACKING
          </span>

          <h2>
            Study Activity
          </h2>

          <p>
            Keep a record of the time you spend studying.
          </p>

        </div>

      </section>


      <section className="activity-layout">

        <div className="activity-list">

          <div className="card-heading">

            <div>

              <span>
                RECENT ACTIVITY
              </span>

              <h2>
                Your Study Sessions
              </h2>

            </div>

          </div>


          {activities.map((activity) => (

            <div
              className="activity-item"
              key={activity.id}
            >

              <div className="activity-icon">
                ◷
              </div>


              <div>

                <strong>
                  {activity.title}
                </strong>

                <span>
                  {activity.date}
                </span>

              </div>


              <strong>
                {activity.duration}
              </strong>

            </div>

          ))}

        </div>


        <div className="log-activity-card">

          <span>
            NEW SESSION
          </span>

          <h2>
            Log Study Activity
          </h2>


          <form onSubmit={handleActivitySubmit}>

            <label>

              Subject / Activity

              <input
                type="text"
                placeholder="e.g. Business Intelligence"
                value={activityForm.title}
                onChange={(e) =>
                  setActivityForm({
                    ...activityForm,
                    title: e.target.value,
                  })
                }
                required
              />

            </label>


            <label>

              Duration

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

            </label>


            <label>

              Date

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

            </label>


            <button
              type="submit"
              className="primary-button"
            >
              Save Activity →
            </button>

          </form>

        </div>

      </section>

    </DashboardLayout>
  );
}


/* =====================================================
   REPORTS
===================================================== */

function ReportsPage({
  navigate,
  goals,
  setShowProfile,
}) {
  return (
    <DashboardLayout
      navigate={navigate}
      setShowProfile={setShowProfile}
    >

      <section className="report-banner">

        <div>

          <span>
            ANALYTICS
          </span>

          <h2>
            Progress Reports
          </h2>

          <p>
            Understand your study consistency and academic progress.
          </p>

        </div>

      </section>


      <section className="report-stat-grid">

        <div className="report-stat">

          <span>
            Completion Rate
          </span>

          <strong>
            78%
          </strong>

          <small>
            ↑ 8% this month
          </small>

        </div>


        <div className="report-stat">

          <span>
            Goals Completed
          </span>

          <strong>
            12
          </strong>

          <small>
            ↑ 3 this month
          </small>

        </div>


        <div className="report-stat">

          <span>
            Study Hours
          </span>

          <strong>
            24.5
          </strong>

          <small>
            ↑ 4.5 hours
          </small>

        </div>


        <div className="report-stat">

          <span>
            Current Streak
          </span>

          <strong>
            7 days
          </strong>

          <small>
            Personal best: 10 days
          </small>

        </div>

      </section>


      <section className="report-chart-card">

        <div className="card-heading">

          <div>

            <span>
              WEEKLY ANALYSIS
            </span>

            <h2>
              Study Consistency
            </h2>

          </div>


          <div className="chart-legend">

            <span>
              ● Completed
            </span>

            <span>
              ○ Target
            </span>

          </div>

        </div>


        <div className="report-chart">

          {[55,72,48,88,68,82,92].map(
            (height,index) => (

              <div
                className="report-column"
                key={index}
              >

                <div
                  className="report-bar"
                  style={{
                    height: `${height}%`,
                  }}
                ></div>

                <span>
                  {
                    [
                      "Mon",
                      "Tue",
                      "Wed",
                      "Thu",
                      "Fri",
                      "Sat",
                      "Sun",
                    ][index]
                  }
                </span>

              </div>

            )
          )}

        </div>

      </section>


      <section className="report-bottom-grid">

        <div className="report-insight-card">

          <span>
            GOAL BREAKDOWN
          </span>

          <h2>
            Academic Progress
          </h2>


          {goals.slice(0,4).map((goal) => (

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

              <strong>
                {goal.progress}%
              </strong>

            </div>

          ))}

        </div>


        <div className="report-overall-card">

          <span>
            OVERALL
          </span>

          <h2>
            Your consistency is improving.
          </h2>

          <p>
            Keep completing small tasks regularly.
            Consistent daily progress can help you
            stay on track with your academic goals.
          </p>

          <button
            className="primary-button"
            onClick={() => navigate("microgoals")}
          >
            Continue Studying →
          </button>

        </div>

      </section>

    </DashboardLayout>
  );
}


/* =====================================================
   PROFILE
===================================================== */

function ProfileModal({
  close,
  logout,
}) {
  return (
    <div className="profile-modal-overlay">

      <div className="profile-modal">

        <button
          className="modal-close"
          onClick={close}
        >
          ×
        </button>


        <div className="profile-avatar large">
          AS
        </div>


        <h2>
          Ahmed Suweyba
        </h2>

        <p>
          University Student
        </p>


        <div className="profile-details">

          <div>

            <span>
              Email
            </span>

            <strong>
              student@example.com
            </strong>

          </div>


          <div>

            <span>
              Goals
            </span>

            <strong>
              4 active goals
            </strong>

          </div>


          <div>

            <span>
              Study Streak
            </span>

            <strong>
              7 days 🔥
            </strong>

          </div>

        </div>


        <button
          className="secondary-button"
          onClick={logout}
        >
          Disconnect
        </button>

      </div>

    </div>
  );
}


export default App;