import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/cookiesHelper";
import { login } from "../../services/apiService";
import { saveParametersIntoLocalStorage } from "../../helpers/commonHelper";
import { useEffect } from "react";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  let navigate = useNavigate();
  const showToast = (type, summary, details) => {
    toast.current.show({
      severity: type || "success",
      summary: summary || "Success Message",
      detail: details || "",
      life: 50000,
    });
  };
  
  const handleLoginClick = async () => {
    if (!loginData.email || !loginData.email.trim()) {
      showToast("error", "Username is required");
      return;
    }
    if (!loginData.password || !loginData.password.trim()) {
      showToast("error", "Password is required");
      return;
    }
    try {
      setLoading(true);
      const response = await login(JSON.stringify(loginData));
      if (response.status === 200) {
        const data = response.data || {};
        saveParametersIntoLocalStorage("userID", data.id);
        setCookie("token", `${data.accessToken}`, 7);
        setCookie("userId", `${data.id}`, 7);
        navigate("/performance-insights/historical-data", { replace: true });
      }
    } catch (error) {
        console.error(error);
      showToast("error", "Something went wrong!! please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData({ ...loginData, [name]: value });
  };
  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="app-logo " />
        <div className="login-box">
          <div className="login-title text-center">
            <div>Welcome back,</div>
            <span>Please sign in to your account below.</span>
          </div>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter username"
            value={loginData.email}
            onChange={(e) => handleInputChange(e)}
          />
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter Password"
            value={loginData.password}
            onChange={(e) => handleInputChange(e)}
          />
          <button
            className="btn btn-primary"
            onClick={handleLoginClick}
            disabled={loading}
          >
            {loading && <i className="pi pi-spin pi-spinner"></i>} Login To
            Application
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/reset-password')}
          >
            Reset Password
          </button>
        </div>
        <div className="copyright-text">Copyright &copy; Greymine {new Date().getFullYear()}</div>
      </div>
      <Toast ref={toast} position="top-right"></Toast>
    </div>
  );
};

export default Login;
