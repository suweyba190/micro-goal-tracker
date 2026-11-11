
import { useState, useEffect } from "react";
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

const API_URL = "http://127.0.0.1:5000";

function App() {
  const [page, setPage] = useState("home");
  const [showProfile, setShowProfile] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  const [goals, setGoals] = useState([]);
  const [microGoals, setMicroGoals] = useState([]);

  const [activities, setActivities] = useState([
    { id: 1, title: "Database Systems", duration: "1 hr 30 min", date: "Today" },
    { id: 2, title: "Business Intelligence", duration: "1 hr", date: "Yesterday" },
    { id: 3, title: "Final Year Project", duration: "2 hrs", date: "Sep 30, 2026" }
  ]);

  const [newGoal, setNewGoal] = useState({
    title: "",
    subject: "",
    date: "",
    priority: "Medium",
    description: ""
  });

  const [activityForm, setActivityForm] = useState({
    title: "",
    duration: "",
    date: ""
  });

  const navigate = (destination) => {
    setPage(destination);
    setShowProfile(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // LOAD THE CONNECTED STUDENT'S ACADEMIC GOALS
  useEffect(() => {
    if (!currentStudent) return;

    const loadStudentGoals = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/goals?student_id=${encodeURIComponent(currentStudent.student_id)}`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Could not retrieve your goals.");
        }

        setGoals(result.goals || []);
        console.log("Student goals loaded:", result.goals);

      } catch (error) {
        console.error("Loading goals error:", error);
        alert("Your academic goals could not be loaded. Please check that Flask is running.");
      }
    };

    loadStudentGoals();
  }, [currentStudent]);

  // LOAD THE CONNECTED STUDENT'S MICRO-GOALS
  useEffect(() => {
    if (!currentStudent) return;

    const loadMicroGoals = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/micro-goals?student_id=${encodeURIComponent(currentStudent.student_id)}`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Could not retrieve your micro-goals.");
        }

        setMicroGoals(result.micro_goals || []);
        console.log("Student micro-goals loaded:", result.micro_goals);

      } catch (error) {
        console.error("Loading micro-goals error:", error);
        alert("Your micro-goals could not be loaded. Please check that Flask is running.");
      }
    };

    loadMicroGoals();
  }, [currentStudent]);

  // REGISTER STUDENT
  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const full_name = String(formData.get("full_name") || "").trim();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm_password");

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (typeof password !== "string" || password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name, email, password })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed.");
      }

      form.reset();
      alert("Account created successfully! You can now connect.");
      navigate("login");

    } catch (error) {
      console.error("Registration error:", error);

      alert(
        error.message === "Failed to fetch"
          ? "Could not connect to the backend. Make sure Flask is running."
          : error.message
      );
    }
  };

  // CONNECT STUDENT
  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = String(formData.get("email") || "").trim().toLowerCase();
    const password = formData.get("password");

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Connection failed.");
      }

      setCurrentStudent(result.student);
      form.reset();

      alert(`Welcome, ${result.student.full_name}!`);
      navigate("dashboard");

    } catch (error) {
      console.error("Connection error:", error);

      alert(
        error.message === "Failed to fetch"
          ? "Could not connect to the backend. Make sure Flask is running."
          : error.message
      );
    }
  };

  // CREATE ACADEMIC GOAL
  const handleCreateGoal = async (e) => {
    e.preventDefault();

    if (!currentStudent) {
      alert("Please connect to your student account first.");
      navigate("login");
      return;
    }

    if (!newGoal.title.trim() || !newGoal.subject.trim() || !newGoal.date) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/goals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: currentStudent.student_id,
          title: newGoal.title.trim(),
          subject: newGoal.subject.trim(),
          date: newGoal.date,
          priority: newGoal.priority,
          description: newGoal.description.trim()
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not create your goal.");
      }

      setGoals((previousGoals) => [...previousGoals, result.goal]);

      setNewGoal({
        title: "",
        subject: "",
        date: "",
        priority: "Medium",
        description: ""
      });

      alert("Your goal has been saved successfully!");
      navigate("goals");

    } catch (error) {
      console.error("Create goal error:", error);

      alert(
        error.message === "Failed to fetch"
          ? "Could not connect to the backend. Make sure Flask is running."
          : error.message
      );
    }
  };

  // CREATE A MICRO-GOAL AND SAVE IT TO SQLITE
  const handleCreateMicroGoal = async (microGoalData) => {
    if (!currentStudent) {
      alert("Please connect to your student account first.");
      navigate("login");
      return;
    }

    const goalId = Number(microGoalData.goalId);
    const title = String(microGoalData.title || "").trim();
    const description = String(microGoalData.description || "").trim();

    if (!goalId || !title) {
      alert("Please select an academic goal and enter a micro-goal title.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/micro-goals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: currentStudent.student_id,
          goal_id: goalId,
          title,
          description
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not create your micro-goal.");
      }

      setMicroGoals((previousGoals) => [
        result.micro_goal,
        ...previousGoals
      ]);

      alert("Your micro-goal has been saved successfully!");

    } catch (error) {
      console.error("Create micro-goal error:", error);

      alert(
        error.message === "Failed to fetch"
          ? "Could not connect to the backend. Make sure Flask is running."
          : error.message
      );
    }
  };

  // COMPLETE OR UNCOMPLETE MICRO-GOAL
  const toggleMicroGoal = async (id) => {
    if (!currentStudent) {
      alert("Please connect to your student account first.");
      navigate("login");
      return;
    }

    const selectedGoal = microGoals.find((goal) => goal.id === id);

    if (!selectedGoal) return;

    const newCompletionStatus = !selectedGoal.completed;

    try {
      const response = await fetch(`${API_URL}/api/micro-goals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: currentStudent.student_id,
          completed: newCompletionStatus
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not update your micro-goal.");
      }

      setMicroGoals((previousGoals) =>
        previousGoals.map((goal) =>
          goal.id === id ? result.micro_goal : goal
        )
      );

      console.log("Micro-goal updated:", result.micro_goal);

    } catch (error) {
      console.error("Micro-goal update error:", error);

      alert(
        error.message === "Failed to fetch"
          ? "Could not connect to the backend. Make sure Flask is running."
          : error.message
      );
    }
  };

  // DELETE A MICRO-GOAL FROM SQLITE
  const handleDeleteMicroGoal = async (id) => {
    if (!currentStudent) {
      alert("Please connect to your student account first.");
      navigate("login");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this micro-goal?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/api/micro-goals/${id}?student_id=${encodeURIComponent(currentStudent.student_id)}`,
        {
          method: "DELETE"
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not delete your micro-goal.");
      }

      setMicroGoals((previousGoals) =>
        previousGoals.filter((goal) => goal.id !== id)
      );

      alert("Micro-goal deleted successfully!");

    } catch (error) {
      console.error("Delete micro-goal error:", error);

      alert(
        error.message === "Failed to fetch"
          ? "Could not connect to the backend. Make sure Flask is running."
          : error.message
      );
    }
  };

  // COUNT COMPLETED MICRO-GOALS
  const completedMicroGoals = microGoals.filter(
    (goal) => goal.completed
  ).length;

  // GET DISTINCT SAVED COMPLETION DATES
  const completionDates = [
    ...new Set(
      microGoals
        .filter((goal) => goal.completed && goal.completedAt)
        .map((goal) => goal.completedAt)
    )
  ].sort();

  // CALCULATE LONGEST STREAK
  let runningStreak = 0;
  let longestStreak = 0;
  let previousDate = null;

  completionDates.forEach((dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    const currentDate = new Date(year, month - 1, day);

    if (
      previousDate &&
      (currentDate - previousDate) / 86400000 === 1
    ) {
      runningStreak++;
    } else {
      runningStreak = 1;
    }

    longestStreak = Math.max(longestStreak, runningStreak);
    previousDate = currentDate;
  });

  // CALCULATE CURRENT STREAK
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastCompletion = completionDates.length
    ? (() => {
        const [year, month, day] = completionDates[
          completionDates.length - 1
        ].split("-").map(Number);

        return new Date(year, month - 1, day);
      })()
    : null;

  if (lastCompletion) {
    lastCompletion.setHours(0, 0, 0, 0);
  }

  const daysSinceLastCompletion = lastCompletion
    ? (today - lastCompletion) / 86400000
    : Infinity;

  const currentStreak =
    daysSinceLastCompletion <= 1 ? runningStreak : 0;

  // SAVE STUDY ACTIVITY (CURRENTLY FRONTEND-ONLY)
  const handleActivitySubmit = (e) => {
    e.preventDefault();

    if (!activityForm.title || !activityForm.duration) {
      alert("Please enter the activity and duration.");
      return;
    }

    const newActivity = {
      id: Date.now(),
      title: activityForm.title,
      duration: activityForm.duration,
      date: activityForm.date || "Today"
    };

    setActivities((previousActivities) => [
      newActivity,
      ...previousActivities
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
      {page === "home" && (
        <HomePage navigate={navigate} />
      )}

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
          currentStreak={currentStreak}
          longestStreak={longestStreak}
          completionDates={completionDates}
          microGoals={microGoals}
          currentStudent={currentStudent}
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
          goals={goals}
          microGoals={microGoals}
          toggleMicroGoal={toggleMicroGoal}
          handleCreateMicroGoal={handleCreateMicroGoal}
          handleDeleteMicroGoal={handleDeleteMicroGoal}
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
            setCurrentStudent(null);
            setGoals([]);
            setMicroGoals([]);
            navigate("login");
          }}
        />
      )}
    </>
  );
}

export default App;
