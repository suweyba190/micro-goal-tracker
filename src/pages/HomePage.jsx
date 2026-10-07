function HomePage({ navigate }) {
  return (
    <div className="home-page">

      <nav className="navbar">

        <div className="brand">
          <div className="brand-icon">✓</div>
          <span>MicroGoal</span>
        </div>

        <div className="nav-links">

          <button onClick={() => navigate("home")}>
            Home
          </button>

          <button onClick={() => navigate("home")}>
            Features
          </button>

          <button onClick={() => navigate("home")}>
            About
          </button>

        </div>

        <div className="nav-actions">

          <button
            className="nav-start"
            onClick={() => navigate("register")}
          >
            Get Started
          </button>

        </div>

      </nav>


      <section className="hero">

        <div className="hero-content">

          <div className="hero-badge">
            ✦ Built for better study habits
          </div>

          <h1>
            Turn big goals into
            <span> small wins.</span>
          </h1>

          <p>
            MicroGoal helps university students break academic
            goals into manageable daily tasks and build consistent
            study habits.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-button"
              onClick={() => navigate("register")}
            >
              Start Tracking →
            </button>

            <button
              className="secondary-button"
              onClick={() => navigate("login")}
            >
              Sign In
            </button>

          </div>

        </div>


        <div className="hero-visual">

          <div className="hero-image-card">

            <img
              src="/pexels-zandatsu-35545648.jpg"
              alt="Student studying"
            />

          </div>

          <div className="hero-floating-card streak-card">

            <strong>
              🔥 7 day streak
            </strong>

            <small>
              Keep it going!
            </small>

          </div>

          <div className="hero-floating-card progress-floating-card">

            <small>
              Weekly progress
            </small>

            <strong>
              78%
            </strong>

            <div className="mini-progress">
              <span></span>
            </div>

          </div>

        </div>

      </section>


      <section className="home-stats">

        <div>
          <strong>100%</strong>
          <span>Focus on academics</span>
        </div>

        <div>
          <strong>Daily</strong>
          <span>Micro-goal tracking</span>
        </div>

        <div>
          <strong>Simple</strong>
          <span>Progress analytics</span>
        </div>

      </section>


      <section className="features-section">

        <div className="section-heading">

          <span>
            FEATURES
          </span>

          <h2>
            Everything you need to study consistently.
          </h2>

        </div>


        <div className="features-grid">

          <div className="feature-card">

            <div className="feature-icon">
              🎯
            </div>

            <h3>
              Set Academic Goals
            </h3>

            <p>
              Create clear academic goals and organize
              what you want to accomplish.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              ✓
            </div>

            <h3>
              Track Micro-Goals
            </h3>

            <p>
              Break large goals into smaller daily tasks
              that are easier to complete.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              📊
            </div>

            <h3>
              Monitor Progress
            </h3>

            <p>
              See your study progress, completion rate
              and consistency over time.
            </p>

          </div>

        </div>

      </section>


      <section className="about-section">

        <div className="about-image">

          <img
            src="/thaoantran0101-books-7744938_1920.jpg"
            alt="Books"
          />

        </div>


        <div className="about-content">

          <span>
            ABOUT MICROGOAL
          </span>

          <h2>
            Small steps create
            <span> lasting habits.</span>
          </h2>

          <p>
            University life can become overwhelming when students
            have assignments, projects, exams and other commitments.
            MicroGoal makes academic progress easier by turning
            large goals into small achievable actions.
          </p>

          <button
            className="primary-button"
            onClick={() => navigate("register")}
          >
            Create Your Account →
          </button>

        </div>

      </section>


      <footer className="footer">

        <div className="brand">

          <div className="brand-icon">
            ✓
          </div>

          <span>
            MicroGoal
          </span>

        </div>

        <p>
          Helping students build better study habits,
          one goal at a time.
        </p>

        <small>
          © 2026 MicroGoal. Academic Project.
        </small>

      </footer>

    </div>
  );
}


export default HomePage;