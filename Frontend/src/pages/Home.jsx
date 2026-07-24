import { useNavigate } from "react-router-dom";
import "./Home.css";

import {
    FaWpforms,
    FaChartBar,
    FaShieldAlt
} from "react-icons/fa";

function Home() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    return (

        <div className="home">

            <div className="hero">

                <h1>Google Forms Clone</h1>

                <p>
                    Create beautiful forms, collect responses,
                    and analyze results effortlessly.
                </p>

                <div className="buttons">

                    {
                        token ? (

                            <button
                                onClick={() => navigate("/dashboard")}
                            >
                                Go to Dashboard
                            </button>

                        ) : (

                            <>
                                <button
                                    onClick={() => navigate("/login")}
                                >
                                    Login
                                </button>

                                <button
                                    onClick={() => navigate("/register")}
                                >
                                    Register
                                </button>
                            </>

                        )
                    }

                </div>

            </div>

            <div className="features">

                <div className="card">
                  <FaWpforms className="icon" />
                    <h2>Create Forms</h2>
                    <p>Create unlimited forms with multiple question types.</p>
                </div>

                <div className="card">
                    <FaChartBar className="icon" />
                    <h2> Responses</h2>
                    <p>Collect and manage responses in one place.</p>
                </div>

                <div className="card">
                  <FaShieldAlt className="icon" />
                    <h2> Secure</h2>
                    <p>JWT Authentication keeps your forms protected.</p>
                </div>

            </div>

        </div>

    );

}

export default Home;