import { useState } from "react";
import QuestionCard from "../components/QuestionCard";
import Header from "../components/Header";
import FormHeader from "../components/FormHeader";

function CreateForm() {

    const [questions, setQuestions] = useState([
        {
            id: Date.now(),
            questionText: "",
            type: "short",
            required: false,
            options: []
        }
    ]);

    const addQuestion = () => {

        const newQuestion = {
            id: Date.now(),
            questionText: "",
            type: "short",
            required: false,
            options: ["Option 1", "Option 2"]
        };

        setQuestions([...questions, newQuestion]);

    };

    return (

        <div>

            <Header />

            <FormHeader />

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