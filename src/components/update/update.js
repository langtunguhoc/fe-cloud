import React, { useEffect, useState } from "react";
import "./update.css";
import axios from "axios";

const UpdatePassword = () => {
  const [search, setSearch] = useState("");          // Ô tìm kiếm
  const [accountExists, setAccountExists] = useState(false); // Kiểm tra tài khoản tồn tại
  const [newPassword, setNewPassword] = useState(""); // Mật khẩu mới
  const [successMessage, setSuccessMessage] = useState(""); // Thông báo thành công
  const [errorMessage, setErrorMessage] = useState("");     // Thông báo lỗi
  const [deleteMessage, setDeleteMessage] = useState("");   // Thông báo khi xóa tài khoản

  // Hàm kiểm tra tài khoản có tồn tại hay không
  const checkUserExistence = async () => {
    try {
      if (search.trim() === "") {
        setAccountExists(false);
        setSuccessMessage("");
        setErrorMessage("");
        return;
      }

      // Gọi API để kiểm tra tài khoản
      const response = await axios.get(
        "http://ec2-13-250-208-51.ap-southeast-1.compute.amazonaws.com:8080/api/v1/identity/user",
        {
          params: {
            username: search
          }
        }
      );

      console.log("Full API Response:", response);

      const responseData = response.data;

      // Kiểm tra nếu API trả về thành công và có dữ liệu
      if (response.status === 200 && responseData.data) {
        setAccountExists(true);
        setSuccessMessage("");
        setErrorMessage("");
      } else {
        setAccountExists(false);
        setSuccessMessage("");
        setErrorMessage("Tài khoản không tồn tại.");
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra tài khoản:", error);
      setAccountExists(false);
      setSuccessMessage("");
      setErrorMessage("Lỗi khi kiểm tra tài khoản.");
    }
  };

  // Hàm cập nhật mật khẩu
  const handleUpdatePassword = async () => {
    if (!accountExists || !newPassword) return;

    try {
      // Gọi PUT API để cập nhật mật khẩu
      const response = await axios.put(
        "http://ec2-13-250-208-51.ap-southeast-1.compute.amazonaws.com:8080/api/v1/identity/user",
        {
          username: search,
          password: newPassword
        }
      );

      console.log("Update Password Response:", response);

      // Kiểm tra nếu cập nhật thành công
      if (response.status === 200) {
        setSuccessMessage(`Mật khẩu của ${search} đã được cập nhật.`);
        setErrorMessage("");
        setNewPassword(""); // Reset ô nhập mật khẩu
      } else {
        setSuccessMessage("");
        setErrorMessage("Lỗi khi cập nhật mật khẩu.");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật mật khẩu:", error);
      setSuccessMessage("");
      setErrorMessage("Lỗi khi cập nhật mật khẩu.");
    }
  };

  // Hàm xóa tài khoản
  const handleDeleteAccount = async () => {
    if (!accountExists) return;

    try {
      // Gọi DELETE API để xóa tài khoản
      const response = await axios.delete(`http://ec2-13-250-208-51.ap-southeast-1.compute.amazonaws.com:8080/api/v1/identity/user/${search}`);

      console.log("Delete Account Response:", response);

      // Kiểm tra nếu xóa thành công
      if (response.status === 200) {
        setDeleteMessage(`Tài khoản ${search} đã được xóa.`);
        setAccountExists(false);
        setSuccessMessage("");
        setErrorMessage("");
        setSearch(""); // Reset ô tìm kiếm
      } else {
        setDeleteMessage("Lỗi khi xóa tài khoản.");
      }
    } catch (error) {
      console.error("Lỗi khi xóa tài khoản:", error);
      setDeleteMessage("Lỗi khi xóa tài khoản.");
    }
  };

  // Gọi hàm checkUserExistence mỗi khi nội dung ô tìm kiếm thay đổi
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      checkUserExistence();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div className="update-container">
      <h2>Quản lý tài khoản</h2>

      {/* Ô tìm kiếm */}
      <input
        type="text"
        placeholder="🔍 Tìm kiếm tài khoản..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* Thông báo kết quả */}
      {search && (
        <p className="account-status">
          {accountExists ? "Tài khoản tồn tại." : "Tài khoản không tồn tại."}
        </p>
      )}

      {/* Thông báo thành công hoặc lỗi */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {deleteMessage && <p className="delete-message">{deleteMessage}</p>}

      {/* Form đặt lại mật khẩu và xóa tài khoản */}
      {accountExists && (
        <div className="actions">
          <div className="update-form">
            <h3>Đổi mật khẩu cho {search}</h3>
            <input
              type="password"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="password-input"
            />
            <button className="update-button" onClick={handleUpdatePassword}>
              Cập nhật mật khẩu
            </button>
            <button className="delete-button" onClick={handleDeleteAccount}>
              Xóa tài khoản
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
