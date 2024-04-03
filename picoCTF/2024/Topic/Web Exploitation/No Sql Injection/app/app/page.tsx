"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [visible, setVisible] = useState(true);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== "" || password !== "") {
      setSubmitting(true);
      try {
        const response = await fetch("/api/login/", {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        if (response.status === 200) {
          router.push("/admin");
        } else if (response.status === 401) {
          setMessage("Invalid email or password");
        }
      } catch (error) {
        setMessage("Invalid email or password");
      } finally {
        setSubmitting(false);
      }
    } else {
      setMessage("Email or password cannot be empty");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
     setMessage("");
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, [message]);


  return (
    <div
      style={{
        backgroundColor: "#eaeaed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <form
        style={{
          width: "33.33%",
          backgroundColor: "#fff",
          boxShadow: "0px 8px 24px rgba(149, 157, 165, 0.2)",
          borderRadius: "24px",
          padding: "32px",
          border: "1px solid #E5E7EB",
        }}
      >
        <h2
          style={{ fontSize: "24px", marginBottom: "24px", color: "#475569" }}
        >
          Login
        </h2>
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              color: "#475569",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
            htmlFor="email"
          >
            Email
          </label>
          <input
            style={{
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
              border: "1px solid #CBD5E0",
              borderRadius: "4px",
              width: "100%",
              padding: "8px 12px",
              color: "#475569",
              lineHeight: "1.25",
              outline: "none",
              transition: "box-shadow 0.15s ease-in-out",
            }}
            id="email"
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              color: "#475569",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
            htmlFor="password"
          >
            Password
          </label>
          <input
            style={{
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
              border: "1px solid #CBD5E0",
              borderRadius: "4px",
              width: "100%",
              padding: "8px 12px",
              color: "#475569",
              lineHeight: "1.25",
              outline: "none",
              transition: "box-shadow 0.15s ease-in-out",
            }}
            id="password"
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{
              backgroundColor: "#1E40AF",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "4px",
              padding: "8px 16px",
              outline: "none",
              transition: "background-color 0.15s ease-in-out",
            }}
            type="submit"
            onClick={handleSubmit}
            disabled={submitting || email === "" || password === ""}
          >
            {submitting ? <Spinner /> : "Sign In"}
          </button>
        </div>
        {message.length>0?<div
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            padding: "10px",
            backgroundColor: "red",
            color: "white",
            transition: "opacity 0.5s",
            opacity: visible ? 1 : 0,
            display: visible ? "block" : "none",
          }}

        >
          <p>{message}</p>
        </div>
        :<></>}
      </form>
    </div>
  );
}
