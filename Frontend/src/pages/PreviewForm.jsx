// import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import axios from "axios";
import "./PreviewForm.css";


function PreviewForm() {

    const { id } = useParams();

    const [form, setForm] = useState(null);

    
const [responses, setResponses] = useState({});
const [submitted, setSubmitted] = useState(false);
const navigate = useNavigate();


    

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
    

const handleCheckboxChange = (questionId, option) => {

    setResponses((prev) => {

        const selected = prev[questionId] || [];

        if (selected.includes(option)) {

            return {

                ...prev,

                [questionId]: selected.filter(item => item !== option)

            };

        }

        return {

            ...prev,

            [questionId]: [...selected, option]

        };

    });

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
        

        setSubmitted(true);

    }

    catch (error) {

        console.log(error);

        alert("Failed to Submit Response ");

    }

};
    

 if (submitted) {

                return (
                <>
                <div className="thankyou-page">

                    <div className="thankyou-card">

                        <div className="check">

                            ✓

                        </div>

                        <h1>

                            Thank You!

                        </h1>

                        <p>

                            Your response has been recorded successfully.

                        </p>

                        <div className="thankyou-buttons">

                            <button
                                onClick={() => {

                                    setSubmitted(false);

                                    setResponses({});

                                }}
                            >
                                Submit Another Response
                            </button>

                           <button
                                onClick={() => navigate("/")}
                            >
                                Go Home
                            </button>

                        </div>

                    </div>

                </div>
                </>

            );
            }


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
                        key={question._id}
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

                                    <input
                                        type="checkbox"
                                        checked={
                                            responses[question._id]?.includes(option) || false
                                        }
                                        onChange={() =>
                                            handleCheckboxChange(question._id, option)
                                        }
                                    />

                                </label>

                            ))
                        }

                        {
                             question.type === "dropdown" && (

                                <select
                                    value={responses[question._id] || ""}
                                    onChange={(e) =>
                                        handleResponseChange(
                                            question._id,
                                            e.target.value
                                        )
                                    }
                                >

                                    <option
                                        value=""
                                        disabled
                                    >
                                        Choose an option
                                    </option>

                                    {

                                        question.options.map((option, index) => (

                                            <option
                                                key={index}
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