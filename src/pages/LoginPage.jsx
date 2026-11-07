
function LoginPage({ navigate, handleLogin }) {
  return (
    <div className="auth-page">

      {/* LEFT SIDE */}
      <div className="auth-visual">

        <img
          src="/thought-catalog-505eectW54k-unsplash.jpg"
          alt="Student studying"
        />

        <div className="auth-overlay"></div>

        <div className="auth-brand">
          <div className="brand-icon">
            ✓
          </div>

          MicroGoal
        </div>

        <div className="auth-quote">

          <div className="auth-small-label">
            BUILD BETTER STUDY HABITS
          </div>

          <h2>
            Your goals.
            <br />
            <span>Your progress.</span>
          </h2>

          <p>
            Stay consistent, track your progress,
            and move closer to your academic goals.
          </p>

        </div>

        <div className="auth-mini-stats">

          <div>
            <strong>12</strong>
            <span>Goals completed</span>
          </div>

          <div>
            <strong>7</strong>
            <span>Day streak</span>
          </div>

          <div>
            <strong>78%</strong>
            <span>Completion</span>
          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="auth-form-area">

        <button
          type="button"
          className="back-home"
          onClick={() => navigate("home")}
        >
          ← Back to home
        </button>

        <div className="auth-form">

          <div className="mobile-brand">
            <span>✓</span> MicroGoal
          </div>

          <div className="auth-heading">

            <span>
              WELCOME BACK
            </span>

            <h1>
              Connect to your account
            </h1>

            <p>
              Continue working towards your academic goals.
            </p>

          </div>

          <form
            className="register-form"
            onSubmit={handleLogin}
          >

            <label>
              Email Address

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
            </label>

            <label>
              Password

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </label>

            <div className="form-options">

              <label className="checkbox-label">

                <input
                  type="checkbox"
                  name="remember"
                />

                <span>
                  Remember me
                </span>

              </label>

              <button
                type="button"
                className="forgot-password"
              >
                Forgot password?
              </button>

            </div>

            <button
              type="submit"
              className="auth-submit"
            >
              Connect →
            </button>

          </form>

          <div className="auth-switch">

            Don't have an account?

            <button
              type="button"
              onClick={() => navigate("register")}
            >
              Create one
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default LoginPage;
