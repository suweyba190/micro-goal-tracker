function RegisterPage({ navigate, handleRegister }) {
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
            START YOUR JOURNEY
          </div>

          <h2>
            Progress starts with
            <br />
            <span>one small step.</span>
          </h2>

          <p>
            Build better study habits by turning
            your academic goals into achievable daily actions.
          </p>

        </div>


        <div className="auth-mini-stats">

          <div>
            <strong>✓</strong>
            <span>Daily goals</span>
          </div>

          <div>
            <strong>🔥</strong>
            <span>Study streaks</span>
          </div>

          <div>
            <strong>📊</strong>
            <span>Progress reports</span>
          </div>

        </div>

      </div>


      {/* RIGHT SIDE */}
      <div className="auth-form-area">

        <button
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
              GET STARTED
            </span>

            <h1>
              Create your account
            </h1>

            <p>
              Start building better study habits today.
            </p>

          </div>


          <form
            className="register-form"
            onSubmit={handleRegister}
          >

            <label>
              Full Name

              <input
                type="text"
                placeholder="Enter your full name"
                required
              />
            </label>


            <label>
              Email Address

              <input
                type="email"
                placeholder="Enter your email"
                required
              />
            </label>


            <label>
              Password

              <input
                type="password"
                placeholder="Create a password"
                required
              />
            </label>


            <label>
              Confirm Password

              <input
                type="password"
                placeholder="Confirm your password"
                required
              />
            </label>


            <label className="checkbox-label">

              <input
                type="checkbox"
                required
              />

              <span>
                I agree to the terms and conditions
              </span>

            </label>


            <button
              type="submit"
              className="auth-submit"
            >
              Create Account →
            </button>

          </form>


          <div className="auth-switch">

            Already have an account?

            <button
              onClick={() => navigate("login")}
            >
              Sign in
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RegisterPage;