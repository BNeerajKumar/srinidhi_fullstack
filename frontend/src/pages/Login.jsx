import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("login/", {
        username,
        password,
      });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      window.location.href = "/";

    } catch (err) {
      console.log(err);
      setError("Invalid Username or Password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-header">
          <h1>🏪 Srinidhi Shop</h1>
          <p>Management System</p>
        </div>

        <form onSubmit={handleLogin}>

          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <div className="password-box">

              <input
                type={showPassword ? "text":"password"}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />

              <button
                type="button"
                className="eye-btn"
                onClick={()=>setShowPassword(!showPassword)}
              >
                👁
              </button>

            </div>

          </div>

          {error && <p className="error-msg">{error}</p>}

          <button className="login-btn" type="submit">
            Login
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;