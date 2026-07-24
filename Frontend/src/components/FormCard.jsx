import {
    FaEye,
    FaEdit,
    FaChartBar,
    FaTrash,
    FaRegFileAlt
} from "react-icons/fa";

import "./FormCard.css";

function FormCard({

    form,

    onPreview,

    onEdit,

    onResponses,

    onDelete

}) {

    return (

        <div className="form-card">

            <div className="card-icon">

                <FaRegFileAlt />

            </div>

            <h3>{form.title}</h3>

            <p>{form.description}</p>

            <div className="card-info">

                <span>

                    📝 {form.questions.length} Questions

                </span>

                <span>

                    📅 {

                        new Date(

                            form.createdAt

                        ).toLocaleDateString()

                    }

                </span>

            </div>

            <div className="card-buttons">

                <button onClick={() => onPreview(form._id)}>

                    <FaEye />

                </button>

                <button onClick={() => onEdit(form._id)}>

                    <FaEdit />

                </button>

                <button onClick={() => onResponses(form._id)}>

                    <FaChartBar />

                </button>

                <button onClick={() => onDelete(form._id)}>

                    <FaTrash />

                </button>

            </div>

        </div>

    );

}

export default FormCard;