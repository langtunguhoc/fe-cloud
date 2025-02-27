import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Xử lý đăng nhập
  const handleLogin = async () => {
    try {
      console.log("Đang gửi yêu cầu đăng nhập:", {
        username: username,
        password: password,
      });

      const response = await axios.post(
        "http://ec2-47-129-42-169.ap-southeast-1.compute.amazonaws.com:8080/api/v1/identity/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Phản hồi đăng nhập:", response);

      // Kiểm tra nếu data trả về true thì đăng nhập thành công
      if (response.status === 200 && response.data.data === true) {
        setMessage("Đăng nhập thành công!");
        navigate("/update");
      } else {
        setMessage("Sai tài khoản hoặc mật khẩu!");
      }
    } catch (error) {
      if (error.response) {
        console.error("Lỗi phản hồi:", error.response.data);
        setMessage("Lỗi đăng nhập: " + error.response.data.message);
      } else if (error.request) {
        console.error("Không có phản hồi:", error.request);
        setMessage("Không có phản hồi từ server.");
      } else {
        console.error("Lỗi:", error.message);
        setMessage("Đã xảy ra lỗi: " + error.message);
      }
    }
  };

  // Xử lý chuyển sang trang Register
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      

      <h2>Đăng nhập</h2>
      <input
        type="text"
        placeholder="Nhập username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="Nhập password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
      <button onClick={handleLogin} className="login-button">
        Đăng nhập
      </button>
      {/* Nút chuyển sang trang Register */}
      <button onClick={handleRegister} className="register-button">
        Đăng ký
      </button>
      <p className="login-message">{message}</p>
    </div>
  );
};

export default LoginPage;
