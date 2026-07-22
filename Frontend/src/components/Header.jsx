import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header({
    title,
    description,
    questions,
    onSave
}) {

    const navigate = useNavigate();

    const handlePreview = () => {

        navigate("/preview", {
            state: {
                title,
                description,
                questions
            }
        });

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

        </header>

    );

}

export default Header;