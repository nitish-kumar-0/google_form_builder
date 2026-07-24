import { Link, useNavigate } from "react-router-dom";
import { FaWpforms, FaPlus, FaHome, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

    };

    return (

        <nav className="navbar">

            <div className="logo">

                <FaWpforms />

                <span>Google Forms Clone</span>

            </div>

            <div className="nav-links">

                <Link to="/">
                    <FaHome />
                    Home
                </Link>

                <Link to="/dashboard">
                    My Forms
                </Link>

                <Link to="/create">
                    <FaPlus />
                    Create
                </Link>

            </div>

            <div className="right-nav">

                <FaUserCircle className="avatar"/>

                <span>{user?.fullName}</span>

                <button
                    onClick={handleLogout}
                >

                    <FaSignOutAlt />

                    Logout

                </button>

            </div>

        </nav>

    );

}

export default Navbar;