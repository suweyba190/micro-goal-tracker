import { useState } from "react";
import "./App.css";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import GoalsPage from "./pages/GoalsPage";
import CreateGoalPage from "./pages/CreateGoalPage";
import MicroGoalsPage from "./pages/MicroGoalsPage";
import ActivityPage from "./pages/ActivityPage";
import ReportsPage from "./pages/ReportsPage";
import ProfileModal from "./pages/ProfileModal";


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


export default App;