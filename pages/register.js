import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("User already exists");
    }
  };

  return (
    <div style={authStyles.container}>
      <div style={authStyles.card}>
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            style={authStyles.input}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            style={authStyles.input}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            style={authStyles.input}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button style={authStyles.button}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}



const authStyles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
  },
  card: {
    background: "#1e293b",
    padding: "40px",
    borderRadius: "12px",
    width: "350px",
    color: "white",
    boxShadow: "0 0 20px rgba(0,0,0,0.4)",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "none",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#2563eb",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
    marginTop: "10px",
  },
};