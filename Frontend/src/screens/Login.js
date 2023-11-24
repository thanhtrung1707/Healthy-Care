import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import Message from "./../components/LoadingError/Error";
import Loading from "./../components/LoadingError/Loading";
import { login } from "./../redux/Actions/UserActions";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import {

  USER_LOGIN_SUCCESS,
  
} from "../redux/Constants/UserConstants.js";

const Login = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
  
    // Kiểm tra xem decoded data có chứa email và name không
    if (decoded && decoded.email) {
      const { email: googleEmail, name } = decoded;
  
      try {
        // Gửi thông tin email và name lên backend
        const response = await axios.post('/api/auth/google', { email: googleEmail, name });
  
        // Kiểm tra phản hồi từ backend để xem nếu người dùng đã tồn tại
        if (response.status >= 200 && response.data) {
          // Thực hiện chuyển hướng tới trang home hoặc trang dashboard
          dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });
          localStorage.setItem('userInfo', JSON.stringify(response.data));
          history.push('/'); // Thay đổi '/home' thành đường dẫn tới trang home của bạn
        } else {
          console.log('Đăng nhập thành công!'); // Log thông báo đăng nhập thành công (nếu cần)
          // Tiếp tục xử lý hoặc cập nhật trạng thái người dùng (nếu cần)
        }
      } catch (error) {
        console.error('Lỗi khi gửi thông tin đến backend:', error);
      }
    }
  };
  

  const handleGoogleLoginError = () => {
    console.log('Login Failed');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <GoogleOAuthProvider clientId="486960350131-ni59gvk4mdcjjaonglqijgvln21lkft2.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
            />
          </GoogleOAuthProvider>
  
          <p>
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Create Account
            </Link>
          </p>
        </form>
      
      </div>
    </>
  );
};

export default Login;
