import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
     
   const navigate = useNavigate(); 
    const [fullName, setFullName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const handleRegister = async () => {

    try {

        const res = await axios.post(

            "http://localhost:5000/api/auth/register",

            {
                fullName,
                email,
                password
            }

        );

        alert(res.data.message);

        navigate("/login");

    }

    catch (error) {

        alert(

            error.response?.data?.message ||

            "Registration Failed"

        );

    }

};

    return (

        <div>

            <h1>Register</h1>

            <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />

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

           <button onClick={handleRegister}>

                Register

            </button>

        </div>

    );

}

export default Register;