
import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

function MicroGoalsPage({
  navigate,
  goals,
  microGoals,
  toggleMicroGoal,
  handleCreateMicroGoal,
  handleDeleteMicroGoal,
  completedMicroGoals,
  setShowProfile,
}) {
  const [newMicroGoal, setNewMicroGoal] = useState({
    goalId: "",
    title: "",
    description: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const totalGoals = microGoals.length;

  const progress =
    totalGoals > 0
      ? Math.round((completedMicroGoals / totalGoals) * 100)
      : 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewMicroGoal((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newMicroGoal.goalId || !newMicroGoal.title.trim()) {
      alert("Please select an academic goal and enter a micro-goal title.");
      return;
    }

    setSaving(true);

    try {
      await handleCreateMicroGoal(newMicroGoal);

      setNewMicroGoal({
        goalId: "",
        title: "",
        description: "",
      });

      setShowForm(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout
      navigate={navigate}
      setShowProfile={setShowProfile}
      activePage="microgoals"
    >
      <div className="micro-premium-page">

        {/* HERO */}

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

          <div className="micro-hero-progress">
            <div className="micro-progress-ring">
              <div>
                <strong>{progress}%</strong>
                <span>COMPLETE</span>
              </div>
            </div>

            <div className="micro-progress-count">
              {completedMicroGoals} of {totalGoals} completed
            </div>
          </div>
        </section>

        {/* MAIN CONTENT */}

        <section className="micro-main">

          <div className="micro-checklist-card">

            <div className="micro-card-heading">
              <div>
                <span>YOUR STUDY PLAN</span>
                <h2>Your Checklist</h2>
                <p>
                  Small actions that move your goals forward.
                </p>
              </div>

              <div className="micro-count-badge">
                {completedMicroGoals}/{totalGoals}
              </div>
            </div>

            {/* CREATE BUTTON */}

            <button
              type="button"
              className="micro-back-button"
              onClick={() => setShowForm((previous) => !previous)}
            >
              {showForm ? "− Close Form" : "+ Create Micro-Goal"}
            </button>

            {/* CREATE FORM */}

            {showForm && (
              <form
                onSubmit={handleSubmit}
                style={{
                  background: "#f8f8fb",
                  padding: "22px",
                  borderRadius: "14px",
                  marginTop: "20px",
                  marginBottom: "24px",
                }}
              >
                <h3 style={{ marginTop: 0 }}>
                  Create a Small Study Task
                </h3>

                <label
                  htmlFor="parentGoal"
                  style={{ display: "block", marginBottom: "8px" }}
                >
                  Select Academic Goal
                </label>

                <select
                  id="parentGoal"
                  name="goalId"
                  value={newMicroGoal.goalId}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginBottom: "16px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                  }}
                >
                  <option value="">Choose an academic goal</option>

                  {goals.map((goal) => (
                    <option key={goal.id} value={goal.id}>
                      {goal.title}
                    </option>
                  ))}
                </select>

                {goals.length === 0 && (
                  <p style={{ color: "#a33" }}>
                    You need to create an academic goal first.
                    <button
                      type="button"
                      onClick={() => navigate("createGoal")}
                      style={{
                        marginLeft: "6px",
                        border: "none",
                        background: "none",
                        color: "#5145cd",
                        cursor: "pointer",
                      }}
                    >
                      Create one
                    </button>
                  </p>
                )}

                <label
                  htmlFor="microTitle"
                  style={{ display: "block", marginBottom: "8px" }}
                >
                  Micro-Goal Title
                </label>

                <input
                  id="microTitle"
                  type="text"
                  name="title"
                  placeholder="e.g. Read Chapter 4"
                  value={newMicroGoal.title}
                  onChange={handleInputChange}
                  required
                  maxLength={150}
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginBottom: "16px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    boxSizing: "border-box",
                  }}
                />

                <label
                  htmlFor="microDescription"
                  style={{ display: "block", marginBottom: "8px" }}
                >
                  Description (Optional)
                </label>

                <textarea
                  id="microDescription"
                  name="description"
                  placeholder="Add a little more detail about this task..."
                  value={newMicroGoal.description}
                  onChange={handleInputChange}
                  rows="3"
                  maxLength={500}
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginBottom: "16px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    boxSizing: "border-box",
                    resize: "vertical",
                  }}
                />

                <button
                  type="submit"
                  disabled={saving || goals.length === 0}
                  style={{
                    padding: "12px 20px",
                    border: "none",
                    borderRadius: "8px",
                    background: "#5145cd",
                    color: "#fff",
                    cursor: saving ? "wait" : "pointer",
                    opacity: saving || goals.length === 0 ? 0.6 : 1,
                  }}
                >
                  {saving ? "Saving..." : "Save Micro-Goal"}
                </button>
              </form>
            )}

            {/* MICRO-GOAL LIST */}

            <div className="micro-list">
              {microGoals.length > 0 ? (
                microGoals.map((goal, index) => (
                  <div
                    key={goal.id}
                    className={`micro-premium-item ${
                      goal.completed ? "micro-item-completed" : ""
                    }`}
                  >
                    <div className="micro-item-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <button
                      type="button"
                      className={`micro-premium-checkbox ${
                        goal.completed ? "checked" : ""
                      }`}
                      onClick={() => toggleMicroGoal(goal.id)}
                      aria-label={
                        goal.completed
                          ? `Mark ${goal.title} incomplete`
                          : `Mark ${goal.title} complete`
                      }
                    >
                      {goal.completed ? "✓" : ""}
                    </button>

                    <div className="micro-item-content">
                      <h3>{goal.title}</h3>

                      <p>
                        {goal.goalTitle || "Academic goal"}
                      </p>

                      {goal.description && (
                        <p>{goal.description}</p>
                      )}

                      {goal.completed && goal.completedAt && (
                        <small>
                          Completed on: {goal.completedAt}
                        </small>
                      )}
                    </div>

                    <div
                      className={`micro-item-status ${
                        goal.completed ? "completed-status" : ""
                      }`}
                    >
                      {goal.completed ? "Completed" : "To do"}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteMicroGoal(goal.id)}
                      aria-label={`Delete ${goal.title}`}
                      title="Delete micro-goal"
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "#c0392b",
                        cursor: "pointer",
                        fontSize: "18px",
                        padding: "8px",
                      }}
                    >
                      🗑
                    </button>
                  </div>
                ))
              ) : (
                <div className="micro-empty">
                  <div>✦</div>

                  <h3>No micro-goals yet</h3>

                  <p>
                    Break one of your academic goals into smaller
                    steps to get started.
                  </p>

                  <button
                    onClick={() => {
                      if (goals.length > 0) {
                        setShowForm(true);
                      } else {
                        navigate("createGoal");
                      }
                    }}
                  >
                    Create Your First Micro-Goal →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* SIDE PANEL */}

          <aside className="micro-side-panel">
            <div className="micro-motivation-card">
              <div className="micro-motivation-symbol">
                ✦
              </div>

              <span>KEEP GOING</span>

              <h2>One step at a time.</h2>

              <p>
                You've already completed{" "}
                <strong>{completedMicroGoals}</strong>{" "}
                {completedMicroGoals === 1 ? "step" : "steps"}.
              </p>

              <div className="micro-side-progress">
                <span style={{ width: `${progress}%` }}></span>
              </div>

              <small>
                {progress}% of your micro-goals complete
              </small>
            </div>

            <div className="micro-tip-card">
              <span>STUDY TIP</span>

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
