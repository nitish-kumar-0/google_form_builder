import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header({
    title,
    description,
    questions,
    onSave,
    formId
}) {

    const navigate = useNavigate();

    const handlePreview = () => {

        if (!formId) {

            alert("Please save the form first.");

            return;

        }

        navigate(`/preview/${formId}`);

    };

    const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    alert("Logged Out Successfully 👋");

    navigate("/login");

};

    return (

        <header className="header">

            <button
                className="saveBtn"
                onClick={onSave}
            >
                Save
            </button>

            <button
                className="previewBtn"
                onClick={handlePreview}
            >
                Preview
            </button>
            <button onClick={handleLogout}>
                Logout
            </button>

        </header>

    );

}

export default Header;