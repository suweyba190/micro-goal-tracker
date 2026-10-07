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

export default ProfileModal;