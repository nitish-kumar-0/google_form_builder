import { useState } from "react";
import axios from "axios";

import Header from "../components/Header";
import FormHeader from "../components/FormHeader";
import QuestionCard from "../components/QuestionCard";

function CreateForm() {

    // Form State
    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    // Questions State
    const [questions, setQuestions] = useState([
        {
            id: Date.now(),
            questionText: "",
            type: "short",
            required: false,
            options: ["Option 1", "Option 2"]
        }
    ]);

    const handleSave = async () => {

    try {

        const formData = {
            title,
            description,
            questions
        };

        const response = await axios.post(
            "http://localhost:5000/api/forms",
            formData
        );

        alert("Form Saved Successfully ✅");

        console.log(response.data);

    } catch (error) {

        console.error(error);

        alert("Unable to Save Form ❌");

    }

};

    return (

        <div>

            <Header
                title={title}
                description={description}
                questions={questions}
                onSave={handleSave}
            />
            

            <FormHeader
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
            />

            {
                questions.map((question, index) => (

                    <QuestionCard
                        key={question.id}
                        question={question}
                        index={index}
                        questions={questions}
                        setQuestions={setQuestions}
                    />

                ))
            }

        </div>

    );

}

export default CreateForm;