import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch(); // Redux dispatch
    const navigator = useNavigate();

    // Hàm kiểm tra định dạng email
    const validateEmail = (email) => {
        return email.toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) !== null;
    };

    const handleLogin = async () => {
        // Kiểm tra định dạng email
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid email');
            return;
        }
        // Kiểm tra mật khẩu
        if (!password) {
            toast.error('Invalid password');
            return;
        }

        // Gửi dữ liệu đăng nhập tới API
        let data = await postLogin(email, password);

        // Xử lý kết quả từ API
        if (data && data.EC === 0) {
            // Dispatch vào store + logic
            dispatch({

                //action
                type: 'FETCH_USER_LOGIN_SUCCESS',
                payload: data
            });
            toast.success(data.EM);
            navigator('/'); // Đăng nhập thành công, chuyển về trang chủ
        }
        if (data && +data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    return (
        <div className="login-container">
            <div className='header '>
                <span>Don't have an account yet?</span>
                <button onClick={() => { navigator('/register') }}>Sign Up</button>
            </div>
            <div className='title col-4 mx-auto'>
                Thanh code Reactjs
            </div>
            <div className='wellcome col-4 mx-auto'>
                Hello, who's this?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        type={"email"}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className='form-control' />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input
                        type={"password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className='form-control' />
                </div>
                <span className='forgot-password'>Forgot password?</span>
                <div>
                    <button
                        className='btn-submit'
                        onClick={handleLogin}
                    >
                        Login to Thanh App Question
                    </button>
                </div>
                <div className='text-center'>
                    <span className="back" onClick={() => { navigator('/') }}>&#60; &#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
