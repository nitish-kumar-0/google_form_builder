import { useLocation } from "react-router-dom";
import "./PreviewForm.css";

function PreviewForm() {

    const { state } = useLocation();

    if (!state) {
        return (
            <h2 style={{ textAlign: "center", marginTop: "50px" }}>
                No Form Found
            </h2>
        );
    }

    const { title, description, questions } = state;

    return (

        <div className="preview-container">

            <div className="preview-header">

                <h1>{title || "Untitled Form"}</h1>

                <p>{description || "No Description"}</p>

            </div>

            {
                questions.map((question, index) => (

                    <div
                        className="preview-question"
                        key={question.id}
                    >

                        <h3>
                            {index + 1}. {question.questionText || "Untitled Question"}
                        </h3>

                        {
                            question.type === "short" && (
                                <input
                                    type="text"
                                    placeholder="Your Answer"
                                />
                            )
                        }

                        {
                            question.type === "para" && (
                                <textarea
                                    placeholder="Your Answer"
                                />
                            )
                        }

                        {
                            question.type === "mcq" &&
                            question.options.map((option, i) => (

                                <label key={i}>

                                    <input
                                        type="radio"
                                        name={question.id}
                                    />

                                    {option}

                                </label>

                            ))
                        }

                        {
                            question.type === "checkbox" &&
                            question.options.map((option, i) => (

                                <label key={i}>

                                    <input type="checkbox" />

                                    {option}

                                </label>

                            ))
                        }

                        {
                            question.type === "dropdown" && (

                                <select>

                                    {
                                        question.options.map((option, i) => (

                                            <option key={i}>
                                                {option}
                                            </option>

                                        ))
                                    }

                                </select>

                            )
                        }

                    </div>

                ))
            }

        </div>

    );

}

export default PreviewForm;