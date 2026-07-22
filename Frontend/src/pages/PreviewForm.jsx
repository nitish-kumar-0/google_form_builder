// import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";
import "./PreviewForm.css";


function PreviewForm() {

    const { id } = useParams();

    const [form, setForm] = useState(null);

    
const [responses, setResponses] = useState({});


    

    const fetchForm = async () => {

        try {

            const res = await axios.get(
                `http://localhost:5000/api/forms/${id}`
            );

            setForm(res.data.form);

            console.log(res.data);

        setForm(res.data.form);

        }

        catch (error) {

            console.log(error);

        }

};

useEffect(() => {

    fetchForm();

}, []);

if (!form) {

    return <h2>Loading...</h2>;

}


const handleResponseChange = (questionId, value) => {

    setResponses((prev) => ({
        ...prev,
        [questionId]: value
    }));

};
    
const handleSubmit = async () => {

    try {

        const answers = Object.entries(responses).map(([questionId, answer]) => ({
            questionId,
            answer
        }));

        const payload = {
            answers
        };

        const res = await axios.post(
            `http://localhost:5000/api/forms/${id}/responses`,
            payload
        );

        alert("Response Submitted Successfully ✅");

        console.log(res.data);

    }

    catch (error) {

        console.log(error);

        alert("Failed to Submit Response ❌");

    }

};
    

    return (

        <div className="preview-container">

            <div className="preview-header">

                <h1>{form.title || "Untitled Form"}</h1>

                <p>{form.description|| "No Description"}</p>

            </div>

            {
                form.questions.map((question, index) => (

                    <div
                        className="preview-question"
                        key={question.id}
                    >

                        <h3>
                            {index + 1}. {question.questionText || "Untitled Question"}
                        </h3>

                        {
                            
                            <input
                                type="text"
                                placeholder="Your Answer"
                                value={responses[question._id] || ""}
                                onChange={(e) =>
                                    handleResponseChange(question._id, e.target.value)
                                }
                            />
                            
                            
                        }

                        {

                             question.type === "para" &&
                            

                                <textarea
                                    placeholder="Your Answer"
                                    value={responses[question._id] || ""}
                                    onChange={(e) =>
                                        handleResponseChange(question._id, e.target.value)
                                    }
                                />

                            
                           
                        }

                        {
                            question.type === "mcq" &&
                            question.options.map((option, i) => (

                                <label key={i}>

                                    <input
                                        type="radio"
                                        name={question._id}
                                        value={option}
                                        checked={responses[question._id] === option}
                                        onChange={(e) =>
                                            handleResponseChange(question._id, e.target.value)
                                        }
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

                               <select
                                    value={responses[question._id] || ""}
                                    onChange={(e) =>
                                        handleResponseChange(question._id, e.target.value)
                                    }
                                 >

                                    <option value="">Select</option>

                                    {
                                        question.options.map((option, i) => (

                                            <option
                                                key={i}
                                                value={option}
                                            >
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

    
                <button
                    className="submit-btn"
                    onClick={handleSubmit}
                >
                    Submit
                </button>

        </div>

    );

}

export default PreviewForm;