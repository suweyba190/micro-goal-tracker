
import { useCallback, useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

const API_URL = "http://127.0.0.1:5000";

function StreakPartnersPage({
  navigate,
  currentStudent,
  setShowProfile,
}) {
  const [email, setEmail] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [requests, setRequests] = useState([]);
  const [partnerData, setPartnerData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [sending, setSending] = useState(false);
  const [responding, setResponding] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const studentId = currentStudent?.student_id;

  // LOAD PARTNER AND REQUEST DETAILS
  const loadPartnerData = useCallback(async () => {
    if (!studentId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const [partnerResponse, requestsResponse] = await Promise.all([
        fetch(`${API_URL}/api/partners?student_id=${studentId}`),
        fetch(`${API_URL}/api/partner-requests?student_id=${studentId}`),
      ]);

      const partnerResult = await partnerResponse.json();
      const requestsResult = await requestsResponse.json();

      if (!partnerResponse.ok) {
        throw new Error(
          partnerResult.message || "Could not load partner details."
        );
      }

      if (!requestsResponse.ok) {
        throw new Error(
          requestsResult.message || "Could not load partner requests."
        );
      }

      setPartnerData(partnerResult);
      setRequests(requestsResult.requests || []);
    } catch (err) {
      setError(err.message || "Something went wrong while loading data.");
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  // LOAD DATA WHEN THE STUDENT CHANGES
  useEffect(() => {
    let cancelled = false;

    async function fetchInitialData() {
      if (!studentId) {
        setLoading(false);
        return;
      }

      try {
        const [partnerResponse, requestsResponse] = await Promise.all([
          fetch(`${API_URL}/api/partners?student_id=${studentId}`),
          fetch(`${API_URL}/api/partner-requests?student_id=${studentId}`),
        ]);

        const partnerResult = await partnerResponse.json();
        const requestsResult = await requestsResponse.json();

        if (!partnerResponse.ok) {
          throw new Error(
            partnerResult.message || "Could not load partner details."
          );
        }

        if (!requestsResponse.ok) {
          throw new Error(
            requestsResult.message || "Could not load partner requests."
          );
        }

        if (!cancelled) {
          setPartnerData(partnerResult);
          setRequests(requestsResult.requests || []);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Could not load partner details.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchInitialData();

    return () => {
      cancelled = true;
    };
  }, [studentId]);

  // SEARCH FOR A STUDENT
  const handleSearch = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setSearchResult(null);

    if (!email.trim()) {
      setError("Please enter your friend's registered email address.");
      return;
    }

    setSearching(true);

    try {
      const response = await fetch(
        `${API_URL}/api/partners/search?student_id=${studentId}&email=${encodeURIComponent(
          email.trim()
        )}`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Student could not be found.");
      }

      setSearchResult(result.student);
    } catch (err) {
      setError(err.message);
    } finally {
      setSearching(false);
    }
  };

  // SEND PARTNER REQUEST
  const handleSendRequest = async () => {
    if (!searchResult) return;

    setError("");
    setSuccess("");
    setSending(true);

    try {
      const response = await fetch(`${API_URL}/api/partner-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_id: studentId,
          receiver_id: searchResult.student_id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not send partner request.");
      }

      setSuccess(result.message || "Study partner request sent!");
      setSearchResult(null);
      setEmail("");

      await loadPartnerData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  // ACCEPT OR REJECT A REQUEST
  const handleRequestResponse = async (requestId, action) => {
    setError("");
    setSuccess("");
    setResponding(true);

    try {
      const response = await fetch(
        `${API_URL}/api/partner-requests/${requestId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student_id: studentId,
            action,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not update the request.");
      }

      setSuccess(result.message);
      await loadPartnerData();
    } catch (err) {
      setError(err.message);
    } finally {
      setResponding(false);
    }
  };

  const partner = partnerData?.partner;

  const receivedRequests = requests.filter(
    (request) => request.direction === "received"
  );

  const sentRequests = requests.filter(
    (request) => request.direction === "sent"
  );

  const myStreak = partnerData?.my_streak || 0;

  return (
    <DashboardLayout
      activePage="partners"
      navigate={navigate}
      setShowProfile={setShowProfile}
    >
      <div className="reports-premium-page">
        <div className="reports-hero">
          <div className="reports-hero-content">
            <p className="reports-eyebrow">STUDY TOGETHER</p>
            <h1>Streak Partners 🔥</h1>
            <p>
              Stay consistent, motivate each other, and build better study
              habits together.
            </p>
          </div>

          <div className="reports-hero-score">
            <span>Your current streak</span>
            <h2>{myStreak} 🔥</h2>
            <span>Days</span>
          </div>
        </div>

        {error && (
          <div
            style={{
              background: "#fff0f0",
              color: "#c62828",
              padding: "14px 18px",
              borderRadius: "12px",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              background: "#eaf8ef",
              color: "#207344",
              padding: "14px 18px",
              borderRadius: "12px",
              marginBottom: "20px",
            }}
          >
            {success}
          </div>
        )}

        {loading ? (
          <div className="reports-progress-card">
            <p>Loading your study partner details...</p>
          </div>
        ) : (
          <>
            {partner ? (
              <div className="reports-progress-card">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "12px",
                    marginBottom: "20px",
                  }}
                >
                  <div>
                    <p className="reports-eyebrow">YOUR STUDY PARTNER</p>
                    <h2>You're in this together! 💜</h2>
                  </div>

                  <span
                    style={{
                      background: "#eaf8ef",
                      color: "#207344",
                      padding: "8px 14px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    Connected
                  </span>
                </div>

                <div className="report-premium-stats">
                  <div className="report-premium-stat">
                    <h3>{currentStudent?.full_name || "You"}</h3>
                    <p>Your study streak</p>
                    <h2>{myStreak} 🔥</h2>
                  </div>

                  <div className="report-premium-stat">
                    <h3>{partner.full_name}</h3>
                    <p>Partner's study streak</p>
                    <h2>{partner.current_streak} 🔥</h2>
                  </div>
                </div>

                <div style={{ marginTop: "20px" }}>
                  <p>
                    <strong>Partner email:</strong> {partner.email}
                  </p>
                  <p style={{ color: "#777", marginTop: "8px" }}>
                    Keep completing your own micro-goals every day to maintain
                    your streaks!
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="reports-progress-card">
                  <p className="reports-eyebrow">FIND A STUDY PARTNER</p>
                  <h2>Study better together 🤝</h2>

                  <p style={{ marginBottom: "20px" }}>
                    Enter your friend's registered student email address to
                    connect with them.
                  </p>

                  <form onSubmit={handleSearch}>
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        flexWrap: "wrap",
                      }}
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter student's email address"
                        required
                        style={{
                          flex: "1",
                          minWidth: "220px",
                          padding: "14px",
                          border: "1px solid #ddd",
                          borderRadius: "10px",
                          fontSize: "14px",
                        }}
                      />

                      <button
                        type="submit"
                        disabled={searching}
                        style={{
                          padding: "14px 22px",
                          border: "none",
                          borderRadius: "10px",
                          background: "#7655d9",
                          color: "white",
                          cursor: "pointer",
                          fontWeight: "600",
                        }}
                      >
                        {searching ? "Searching..." : "Search Student"}
                      </button>
                    </div>
                  </form>

                  {searchResult && (
                    <div
                      style={{
                        marginTop: "22px",
                        padding: "18px",
                        border: "1px solid #e5def8",
                        borderRadius: "12px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "15px",
                      }}
                    >
                      <div>
                        <h3>{searchResult.full_name}</h3>
                        <p>{searchResult.email}</p>
                      </div>

                      <button
                        type="button"
                        onClick={handleSendRequest}
                        disabled={sending}
                        style={{
                          padding: "12px 18px",
                          border: "none",
                          borderRadius: "10px",
                          background: "#7655d9",
                          color: "white",
                          cursor: "pointer",
                          fontWeight: "600",
                        }}
                      >
                        {sending ? "Sending..." : "Send Request"}
                      </button>
                    </div>
                  )}
                </div>

                {receivedRequests.length > 0 && (
                  <div className="reports-progress-card">
                    <p className="reports-eyebrow">INCOMING REQUESTS</p>
                    <h2>Partner requests 💌</h2>

                    {receivedRequests.map((request) => (
                      <div
                        key={request.request_id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: "15px",
                          padding: "16px 0",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        <div>
                          <h3>{request.sender_name}</h3>
                          <p>{request.sender_email}</p>
                        </div>

                        <div style={{ display: "flex", gap: "10px" }}>
                          <button
                            type="button"
                            disabled={responding}
                            onClick={() =>
                              handleRequestResponse(
                                request.request_id,
                                "accept"
                              )
                            }
                            style={{
                              padding: "10px 16px",
                              border: "none",
                              borderRadius: "8px",
                              background: "#218653",
                              color: "white",
                              cursor: "pointer",
                            }}
                          >
                            Accept
                          </button>

                          <button
                            type="button"
                            disabled={responding}
                            onClick={() =>
                              handleRequestResponse(
                                request.request_id,
                                "reject"
                              )
                            }
                            style={{
                              padding: "10px 16px",
                              border: "none",
                              borderRadius: "8px",
                              background: "#fff0f0",
                              color: "#c62828",
                              cursor: "pointer",
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {sentRequests.length > 0 && (
                  <div className="reports-progress-card">
                    <p className="reports-eyebrow">SENT REQUESTS</p>
                    <h2>Waiting for a response ⏳</h2>

                    {sentRequests.map((request) => (
                      <div
                        key={request.request_id}
                        style={{
                          padding: "14px 0",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        <h3>{request.receiver_name}</h3>
                        <p>{request.receiver_email}</p>
                        <span
                          style={{
                            color: "#a06b16",
                            fontSize: "13px",
                            fontWeight: "600",
                          }}
                        >
                          Pending
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}

        <div style={{ marginTop: "20px" }}>
          <button
            type="button"
            onClick={loadPartnerData}
            disabled={loading}
            style={{
              padding: "12px 18px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              background: "white",
              cursor: "pointer",
            }}
          >
            {loading ? "Refreshing..." : "↻ Refresh"}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default StreakPartnersPage;
