import React, { useRef, useState, useEffect } from 'react';
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { getSecurityQuestion, resetPassword } from "../../services/apiService";
import { deleteTemporaryReport } from '../../store/slices/reports/SaveNewReport/SaveNewReport';
import { useDispatch } from 'react-redux';
import { getParametersFromLocalStorage } from '../../helpers/commonHelper';

const ResetPassword = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        questionId: "",
        answer: "",
        password: "",
        cnfpassword: ""
    });
    const [securityQuestion, setSecurityQuestion] = useState([])
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const uniqueId = getParametersFromLocalStorage("uniqueid")
    const showToast = (type, summary, details) => {
        toast.current.show({
            severity: type || "success",
            summary: summary || "Success Message",
            detail: details || "",
            life: 50000,
        });
    };
    useEffect(() => {
        (async () => {
            let questions = await getSecurityQuestion();
            setSecurityQuestion(questions);
        })();
    }, [])
    const handleResetPassword = async () => {
        if (!loginData.email || !loginData.email.trim()) {
            showToast("error", "Email is required");
            return;
        }
        if (!loginData.questionId || !loginData.questionId.trim()) {
            showToast("error", "Security question is required");
            return;
        }
        if (!loginData.answer || !loginData.answer.trim()) {
            showToast("error", "Security answer is required");
            return;
        }
        if (!loginData.password || !loginData.password.trim()) {
            showToast("error", "Password is required");
            return;
        }
        if (!loginData.cnfpassword || !loginData.cnfpassword.trim()) {
            showToast("error", "Confirm password is required");
            return;
        }
        if (loginData.cnfpassword != loginData.password) {
            showToast("error", "Password and confirm password are not same");
            return;
        }
        try {
            setLoading(true);
            const response = await resetPassword(JSON.stringify(loginData));
            if (response.status === 200) {
                const data = response.data || {};
                showToast(data.type, data.message);
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
                        <div>Reset Password</div>
                    </div>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter username"
                        value={loginData.email}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <select className='form-control' name="questionId" onChange={(e) => handleInputChange(e)}>
                        <option value="">Please select question</option>
                        {securityQuestion?.data?.data.map((val) => <option value={val.id}>{val.question}</option>)}
                    </select>
                    <input
                        type="text"
                        name="answer"
                        className="form-control"
                        placeholder="Answer security question"
                        value={loginData.answer}
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
                    <input
                        type="text"
                        name="cnfpassword"
                        className="form-control"
                        placeholder="Enter confirm password"
                        value={loginData.cnfpassword}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={handleResetPassword}
                        disabled={loading}
                    >
                        {loading && <i className="pi pi-spin pi-spinner"></i>} Reset Password
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/Login')}
                        disabled={loading}
                    >
                        {loading && <i className="pi pi-spin pi-spinner"></i>} Back To Login
                    </button>
                </div>
                <div className="copyright-text">Copyright &copy; Greymine {new Date().getFullYear()}</div>
            </div>
            <Toast ref={toast} position="top-right"></Toast>
        </div>
    );
};

export default ResetPassword;