import React, { useState } from 'react';
import './register.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit =  async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                'http://ec2-13-250-208-51.ap-southeast-1.compute.amazonaws.com:8080/api/v1/identity/register',
                {
                  username: username,
                  password: password
                },
                {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }
              );
            navigate("/update");
            console.log('register successful:', response.data);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    // Xử lý chuyển sang trang Login
    const handleGoToLogin = () => {
        navigate("/login");
    };

    return (
        <>
        <div className="login-container">
            {/* Nút chuyển sang trang Login */}
            

            <div className="login-header">Đăng kí</div>
                <form className="Login-form" onSubmit={handleSubmit}>
                    <input 
                        className="Login-input" 
                        type="text" 
                        value={username} 
                        placeholder="Tên đăng nhập" 
                        required 
                        onChange={(event) => setUsername(event.target.value)} 
                    /><br />
                    <input 
                        className="Login-input" 
                        type="password" 
                        value={password} 
                        placeholder="Mật khẩu" 
                        required 
                        onChange={(event) => setPassword(event.target.value)} 
                    /><br />
                    <button className="Login-button" type="submit">Đăng kí</button>
                    <button onClick={handleGoToLogin} className="login-button-top-left">
                Đăng nhập
            </button>
                </form>
            </div>
        </>
    );
};

export default RegisterPage;
