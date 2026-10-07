import { useState } from "react";
import "./App.css";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import GoalsPage from "./pages/GoalsPage";
import CreateGoalPage from "./pages/CreateGoalPage";

import DashboardLayout from "./components/DashboardLayout";


function App() {

  const [page, setPage] = useState("home");

  const [showProfile, setShowProfile] = useState(false);


  /* =========================
     GOALS DATA
  ========================= */

  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Complete Database Assignment",
      subject: "Database Systems",
      date: "Oct 08, 2026",
      priority: "High",
      progress: 75,
      description:
        "Complete the remaining database normalization and SQL exercises."
    },

    {
      id: 2,
      title: "Revise Power BI",
      subject: "Business Intelligence",
      date: "Oct 10, 2026",
      priority: "Medium",
      progress: 50,
      description:
        "Review Power BI concepts and practice creating dashboards."
    },

    {
      id: 3,
      title: "Study Regression",
      subject: "Data Analytics",
      date: "Oct 12, 2026",
      priority: "High",
      progress: 30,
      description:
        "Study regression analysis and practice building prediction models."
    },

    {
      id: 4,
      title: "Final Year Project",
      subject: "Project",
      date: "Oct 20, 2026",
      priority: "High",
      progress: 100,
      description:
        "Continue developing and documenting the final year project."
    }
  ]);


  /* =========================
     MICRO GOALS DATA
  ========================= */

  const [microGoals, setMicroGoals] = useState([
    {
      id: 1,
      title: "Read Chapter 4",
      completed: true
    },

    {
      id: 2,
      title: "Complete normalization exercises",
      completed: true
    },

    {
      id: 3,
      title: "Review SQL joins",
      completed: false
    },

    {
      id: 4,
      title: "Practice 10 SQL questions",
      completed: false
    }
  ]);


  /* =========================
     ACTIVITY DATA
  ========================= */

  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "Database Systems",
      duration: "1 hr 30 min",
      date: "Today"
    },

    {
      id: 2,
      title: "Business Intelligence",
      duration: "1 hr",
      date: "Yesterday"
    },

    {
      id: 3,
      title: "Final Year Project",
      duration: "2 hrs",
      date: "Sep 30, 2026"
    }
  ]);


  /* =========================
     CREATE GOAL FORM
  ========================= */

  const [newGoal, setNewGoal] = useState({
    title: "",
    subject: "",
    date: "",
    priority: "Medium",
    description: ""
  });


  /* =========================
     ACTIVITY FORM
  ========================= */

  const [activityForm, setActivityForm] = useState({
    title: "",
    duration: "",
    date: ""
  });


  /* =========================
     NAVIGATION
  ========================= */

  const navigate = (destination) => {

    setPage(destination);

    setShowProfile(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  /* =========================
     REGISTER
  ========================= */

  const handleRegister = (e) => {

    e.preventDefault();

    alert("Account created successfully!");

    navigate("login");

  };


  /* =========================
     LOGIN
  ========================= */

  const handleLogin = (e) => {

    e.preventDefault();

    navigate("dashboard");

  };


  /* =========================
     CREATE GOAL
  ========================= */

  const handleCreateGoal = (e) => {

    e.preventDefault();


    if (
      !newGoal.title ||
      !newGoal.subject ||
      !newGoal.date
    ) {

      alert("Please fill in all required fields.");

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
        newGoal.description ||
        "Academic goal created by student."

    };


    setGoals([
      ...goals,
      goal
    ]);


    setNewGoal({

      title: "",
      subject: "",
      date: "",
      priority: "Medium",
      description: ""

    });


    navigate("goals");

  };


  /* =========================
     MICRO GOAL TOGGLE
  ========================= */

  const toggleMicroGoal = (id) => {

    setMicroGoals(
      microGoals.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              completed: !goal.completed
            }
          : goal
      )
    );

  };


  /* =========================
     COMPLETED MICRO GOALS
  ========================= */

  const completedMicroGoals =
    microGoals.filter(
      (goal) => goal.completed
    ).length;


  /* =========================
     ACTIVITY SUBMIT
  ========================= */

  const handleActivitySubmit = (e) => {

    e.preventDefault();


    if (
      !activityForm.title ||
      !activityForm.duration
    ) {

      alert("Please enter the activity and duration.");

      return;
    }


    const newActivity = {

      id: Date.now(),

      title: activityForm.title,

      duration: activityForm.duration,

      date:
        activityForm.date ||
        "Today"

    };


    setActivities([
      newActivity,
      ...activities
    ]);


    setActivityForm({

      title: "",
      duration: "",
      date: ""

    });


    alert("Study activity saved successfully!");

  };


  return (

    <>

      {/* =========================
          HOME
      ========================= */}

      {page === "home" && (

        <HomePage
          navigate={navigate}
        />

      )}


      {/* =========================
          REGISTER
      ========================= */}

      {page === "register" && (

        <RegisterPage
          navigate={navigate}
          handleRegister={handleRegister}
        />

      )}


      {/* =========================
          LOGIN
      ========================= */}

      {page === "login" && (

        <LoginPage
          navigate={navigate}
          handleLogin={handleLogin}
        />

      )}


      {/* =========================
          DASHBOARD
      ========================= */}

      {page === "dashboard" && (

        <DashboardPage
          navigate={navigate}
          goals={goals}
          setShowProfile={setShowProfile}
        />

      )}


      {/* =========================
          GOALS
      ========================= */}

      {page === "goals" && (

        <GoalsPage
          navigate={navigate}
          goals={goals}
          setShowProfile={setShowProfile}
        />

      )}


      {/* =========================
          CREATE GOAL
      ========================= */}

      {page === "createGoal" && (

        <CreateGoalPage
          navigate={navigate}
          newGoal={newGoal}
          setNewGoal={setNewGoal}
          handleCreateGoal={handleCreateGoal}
        />

      )}


      {/* =========================
          MICRO GOALS
      ========================= */}

      {page === "microgoals" && (

        <MicroGoalsPage
          navigate={navigate}
          microGoals={microGoals}
          toggleMicroGoal={toggleMicroGoal}
          completedMicroGoals={completedMicroGoals}
          setShowProfile={setShowProfile}
        />

      )}


      {/* =========================
          ACTIVITY
      ========================= */}

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


      {/* =========================
          REPORTS
      ========================= */}

      {page === "reports" && (

        <ReportsPage
          navigate={navigate}
          goals={goals}
          setShowProfile={setShowProfile}
        />

      )}


      {/* =========================
          PROFILE
      ========================= */}

      {showProfile && (

        <ProfileModal

          close={() =>
            setShowProfile(false)
          }

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
   CREATE GOAL PAGE
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


/* =====================================================
   MICRO GOALS PAGE
===================================================== */

function MicroGoalsPage({
  navigate,
  microGoals,
  toggleMicroGoal,
  completedMicroGoals,
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
            DAILY MICRO-GOALS
          </span>

          <h2>
            Micro-goals
          </h2>

          <p>
            Complete smaller steps to make steady
            progress toward your academic goals.
          </p>

        </div>

      </section>


      <section className="micro-goals-section">

        <div className="micro-summary">

          <strong>
            {completedMicroGoals}
          </strong>

          <span>
            of {microGoals.length} completed
          </span>

        </div>


        <div className="micro-goals-list">

          {microGoals.map((goal) => (

            <div
              className={`micro-goal-item ${
                goal.completed
                  ? "completed"
                  : ""
              }`}
              key={goal.id}
            >

              <button
                className="micro-checkbox"
                onClick={() =>
                  toggleMicroGoal(goal.id)
                }
              >
                {goal.completed
                  ? "✓"
                  : ""}
              </button>


              <span>
                {goal.title}
              </span>

            </div>

          ))}

        </div>


        <button
          className="secondary-button"
          onClick={() =>
            navigate("goals")
          }
        >
          ← Back to Goals
        </button>

      </section>

    </DashboardLayout>

  );

}


/* =====================================================
   ACTIVITY PAGE
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


/* =====================================================
   REPORTS PAGE
===================================================== */

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


/* =====================================================
   PROFILE MODAL
===================================================== */

function ProfileModal({
  close,
  logout,
}) {

  return (

    <div
      className="profile-overlay"
      onClick={close}
    >

      <div
        className="profile-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        <button
          className="profile-close"
          onClick={close}
        >
          ×
        </button>


        <div className="profile-avatar">
          👤
        </div>


        <h2>
          Student Profile
        </h2>


        <p>
          Manage your account and study profile.
        </p>


        <div className="profile-details">

          <div>

            <span>
              Name
            </span>

            <strong>
              Student
            </strong>

          </div>


          <div>

            <span>
              Account Type
            </span>

            <strong>
              University Student
            </strong>

          </div>

        </div>


        <button
          className="logout-button"
          onClick={logout}
        >
          Disconnect
        </button>

      </div>

    </div>

  );

}


export default App;