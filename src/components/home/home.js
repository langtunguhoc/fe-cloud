import React, { useEffect, useState } from 'react';
import './home.css';
import axios from 'axios';

const InforPage = () => {
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState("");

    const checkUserExistence = async () => {
        try {
            // Only search if there is input in the search box
            if (search.trim() === "") {
                setMessage("");
                return;
            }

            // Send a request with the username as a query parameter
            const response = await axios.get('http://ec2-47-129-42-169.ap-southeast-1.compute.amazonaws.com:8080/api/v1/identity/user', {
                params: {
                    username: search
                }
            });

            console.log("Full API Response:", response);

            // Extract the nested data
            const responseData = response.data;

            // Check if the status is 200 OK
            if (responseData.status === '200 OK') {
                // Check if data is true (user exists)
                if (responseData.data === true) {
                    setMessage("Tài khoản tồn tại.");
                } else {
                    setMessage("Tài khoản không tồn tại.");
                }
            } else {
                setMessage("Lỗi: Không thể kiểm tra tài khoản.");
                console.error("API không trả về dữ liệu hợp lệ:", responseData);
            }
        } catch (error) {
            console.error('Lỗi khi kiểm tra tài khoản:', error);
            setMessage("Lỗi: Không thể kiểm tra tài khoản.");
        }
    };

    // Call the checkUserExistence function whenever the search input changes
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            checkUserExistence();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    return (
        <div className="infor-container">
            <div className="infor-titleBox">
                <h2>Kiểm tra tài khoản</h2>
            </div>

            {/* Ô tìm kiếm */}
            <input
                type="text"
                placeholder="🔍 Tìm kiếm tài khoản..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />

            {/* Thông báo kết quả */}
            <div className="infor-boxContainer1">
                <p>{message}</p>
            </div>
        </div>
    );
};

export default InforPage;
