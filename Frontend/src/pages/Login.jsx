import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login() {


    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const handleLogin = async () => {

    try {

        const res = await axios.post(

            "http://localhost:5000/api/auth/login",

            {
                email,
                password
            }

        );

        // Save Token
        localStorage.setItem("token", res.data.token);

        // Save User
        localStorage.setItem(

            "user",

            JSON.stringify(res.data.user)

        );

      

        navigate("/dashboard");

    }

    catch (error) {

        alert(

            error.response?.data?.message ||

            "Login Failed"

        );

    }

};

    return (

        <div className="login">

            <h1>Login</h1>
            

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

            

          <button onClick={handleLogin}>

                Login

            </button>
        </div>

    );

}

export default Login;