function HomePage({ navigate }) {
  return (
    <div className="premium-home">

      {/* NAVBAR */}
      <nav className="premium-nav">

        <div className="premium-logo">
          Micro<span>Goal</span>
        </div>

        <div className="premium-nav-links">
          <button onClick={() => navigate("home")}>
            Home
          </button>

          <button onClick={() => navigate("login")}>
            Sign In
          </button>

          <button
            className="premium-nav-cta"
            onClick={() => navigate("register")}
          >
            Get Started
          </button>
        </div>

      </nav>


      {/* HERO */}
      <section className="premium-hero">

        <div className="hero-glow glow-one"></div>
        <div className="hero-glow glow-two"></div>

        <div className="premium-hero-content">

          <div className="premium-label">
            STUDY SMARTER • ONE STEP AT A TIME
          </div>

          <h1>
            Small goals.
            <br />
            <span>Big progress.</span>
          </h1>

          <p>
            Turn your academic goals into small, manageable
            micro-goals and build study habits that actually last.
          </p>

          <div className="premium-hero-buttons">

            <button
              className="premium-primary"
              onClick={() => navigate("register")}
            >
              Start Tracking →
            </button>

            <button
              className="premium-secondary"
              onClick={() => navigate("login")}
            >
              Sign In
            </button>

          </div>

          <div className="hero-note">
            Designed for university students
          </div>

        </div>


        {/* HERO VISUAL */}
        <div className="premium-hero-visual">

          <div className="hero-orbit orbit-one"></div>
          <div className="hero-orbit orbit-two"></div>

          <div className="hero-main-image">

            <img
              src="/pexels-gera-cejas-3616330-37762503.jpg"
              alt="Student studying"
            />

          </div>


          {/* FLOATING PROGRESS CARD */}
          <div className="floating-ui progress-ui">

            <div className="floating-icon">✓</div>

            <div>
              <small>Weekly Progress</small>

              <strong>78%</strong>

              <div className="mini-progress">
                <span></span>
              </div>
            </div>

          </div>


          {/* FLOATING GOAL CARD */}
          <div className="floating-ui goal-ui">

            <div className="check-circle">
              ✓
            </div>

            <div>
              <strong>Micro-goal completed</strong>
              <small>Database Systems</small>
            </div>

          </div>


          {/* STREAK CARD */}
          <div className="floating-ui streak-ui">

            <span>🔥</span>

            <div>
              <strong>7 days</strong>
              <small>Study streak</small>
            </div>

          </div>

        </div>

      </section>


      {/* INTRO SECTION */}
      <section className="premium-intro">

        <div className="intro-small">
          THE PROBLEM
        </div>

        <h2>
          Big academic goals can feel
          <span> overwhelming.</span>
        </h2>

        <p>
          MicroGoal helps students break large academic tasks
          into smaller actions that are easier to understand,
          complete and track.
        </p>

      </section>


      {/* HOW IT WORKS */}
      <section className="premium-process">

        <div className="process-heading">

          <div className="intro-small">
            HOW IT WORKS
          </div>

          <h2>
            From intention
            <br />
            to <span>action.</span>
          </h2>

        </div>


        <div className="process-list">

          <div className="process-item">

            <span className="process-number">
              01
            </span>

            <div>
              <h3>Set a Goal</h3>

              <p>
                Create an academic goal and give it
                a clear deadline and priority.
              </p>
            </div>

          </div>


          <div className="process-item">

            <span className="process-number">
              02
            </span>

            <div>
              <h3>Break It Down</h3>

              <p>
                Turn your larger goal into small,
                achievable daily micro-goals.
              </p>
            </div>

          </div>


          <div className="process-item">

            <span className="process-number">
              03
            </span>

            <div>
              <h3>Track Progress</h3>

              <p>
                Monitor completed tasks, study activity
                and your overall consistency.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* BIG STATEMENT */}
      <section className="premium-statement">

        <div className="statement-number">
          01
        </div>

        <h2>
          Consistency is built
          <br />
          through <span>small actions.</span>
        </h2>

        <p>
          MicroGoal gives students a simple way to stay
          organized, reduce procrastination and keep moving
          towards their academic goals.
        </p>

      </section>


      {/* FEATURES */}
      <section className="premium-features">

        <div className="feature-heading">

          <div className="intro-small">
            BUILT FOR STUDENTS
          </div>

          <h2>
            Everything you need
            <br />
            to stay <span>consistent.</span>
          </h2>

        </div>


        <div className="feature-showcase">

          <div className="feature-large">

            <div className="feature-number">
              01
            </div>

            <h3>
              Academic Goals
            </h3>

            <p>
              Create and organize goals for your
              university courses, assignments and projects.
            </p>

            <div className="feature-arrow">
              →
            </div>

          </div>


          <div className="feature-large dark-feature">

            <div className="feature-number">
              02
            </div>

            <h3>
              Micro Goals
            </h3>

            <p>
              Break big tasks into smaller actions
              that feel easier to complete.
            </p>

            <div className="feature-arrow">
              →
            </div>

          </div>


          <div className="feature-large">

            <div className="feature-number">
              03
            </div>

            <h3>
              Progress Tracking
            </h3>

            <p>
              See your progress and study activity
              through a simple dashboard.
            </p>

            <div className="feature-arrow">
              →
            </div>

          </div>

        </div>

      </section>


      {/* FINAL CTA */}
      <section className="premium-cta">

        <div className="cta-glow"></div>

        <div className="cta-content">

          <div className="intro-small">
            READY TO START?
          </div>

          <h2>
            Your next achievement
            <br />
            starts with <span>one goal.</span>
          </h2>

          <p>
            Start small. Stay consistent. Make progress.
          </p>

          <button
            className="premium-primary cta-button"
            onClick={() => navigate("register")}
          >
            Create Your Account →
          </button>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="premium-footer">

        <div className="premium-logo">
          Micro<span>Goal</span>
        </div>

        <p>
          A web-based micro-goal tracker for university students.
        </p>

        <div className="footer-actions">

          <button onClick={() => navigate("login")}>
            Sign In
          </button>

          <button onClick={() => navigate("register")}>
            Get Started
          </button>

        </div>

      </footer>

    </div>
  );
}

export default HomePage;