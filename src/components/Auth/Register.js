// Import necessary dependencies and components
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRegister } from '../../services/apiServices'; // Assuming you have a register API service
import { toast } from 'react-toastify';
import './Register.scss';
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
const Register = () => {
    // Define state variables for registration form
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');

    // UseNavigate hook for navigation
    const navigator = useNavigate();

    // State to manage password visibility
    const [isShowPassword, setShowPassword] = useState(false);
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    // Function to handle registration
    const handleRegister = async () => {
        // Validation logic
        const isValidEmail = validateEmail(email)
        if (!isValidEmail) {
            toast.error('invalid email')

            return;
        }
        if (!password) {
            toast.error('invalid password')

            return;
        }
        if (!email || !password || !username) {
            toast.error('Email, password, and username are required');
            return;
        }

        // Submit registration data to the API
        const data = await postRegister(email, password, username);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            // You can navigate to the login page after successful registration
            navigator('/login'); //tao tai khoan thanh cong thi quay ve tang login
        } else if (data && +data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    return (
        <div className="register-container">
            {/* Similar structure to the login form */}
            {/* ... (You can customize the header and other UI elements) */}
            <div className='header '>
                <span>    Don't have an account yet?</span>
                <button onClick={() => { navigator('/login') }}>Sign in</button>
            </div>
            <div className='title col-4 mx-auto'>
                Thanh code Reactjs
            </div>
            <div className='wellcome col-4 mx-auto'>
                Hello, who's this?
            </div>
            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <label>Email (*)</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group pass-group">
                    <label>Password (*)</label>
                    <input
                        type={isShowPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="form-control "
                        required
                    />

                    {isShowPassword ?
                        <span className='icons-eye'
                            onClick={() => setShowPassword(false)}
                        >
                            <VscEye />
                        </span>
                        :
                        <span className='icons-eye'
                            onClick={() => setShowPassword(true)}
                        >
                            <VscEyeClosed />
                        </span>
                    }
                </div>
                <div className="form-group">
                    <label>User Name</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(event) => setUserName(event.target.value)}
                        className="form-control"
                    />
                </div>
                {/* Add any additional fields you need for registration */}
                <div>
                    <button className="btn-submit" onClick={handleRegister}>
                        Register
                    </button>
                </div>
                {/* Navigation link to go back to the homepage */}
                <div className="text-center">
                    <span className="back" onClick={() => navigator('/')}>
                        &#60; &#60; Go to Homepage
                    </span>
                </div>
            </div>
        </div >
    );
};

export default Register;
