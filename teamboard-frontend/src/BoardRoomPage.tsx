// src/BoardRoomPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BoardRoomPage() {
  const { boardCode } = useParams();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:5001/api/test-auth", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser({ name: res.data.user.name, email: res.data.user.email }))
      .catch(() => setUser(null));
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      padding: "40px",
      textAlign: "center",
    }}>
      <h1>Board Room</h1>
      <p><strong>Board Code:</strong> {boardCode}</p>

      {user ? (
        <>
          <p>Welcome, <b>{user.name}</b>!</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>Loading user...</p>
      )}
    </div>
  );
}