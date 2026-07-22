import { useState } from "react";
import api from "../api/axios";

import { useParams } from "react-router-dom";
import { useEffect } from "react";

import Header from "../components/Header";
import FormHeader from "../components/FormHeader";
import QuestionCard from "../components/QuestionCard";

function CreateForm() {

    // Form State
    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [formId, setFormId] = useState(null);

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

    const { id } = useParams();

const handleSave = async () => {

    try {

        const formData = {
            title,
            description,
            questions
        };

        let response;

        if (id) {

            response = await api.put(
                `http://localhost:5000/api/forms/${id}`,
                formData
            );

            alert("Form Updated Successfully ");

        } else {

            response = await api.post(
                "/forms",
                formData
            );

            setFormId(response.data.data._id);

            alert("Form Saved Successfully ");

        }

     
    }

    catch (error) {

    console.log(error);

    console.log(error.response);

    console.log(error.response?.data);

    alert("Unable to Save Form ");

    }

};


    const fetchForm = async () => {

    try {

        const res = await api.get(
            `http://localhost:5000/api/forms/${id}`
        );
        setFormId(form._id);
        const form = res.data.form;

        setTitle(form.title);

        setDescription(form.description);

        setQuestions(form.questions);

    }

    catch (error) {

        console.log(error);

    }

};

useEffect(() => {

        if (id) {

            fetchForm();

        }

    }, [id]);


    return (

        <div>

            <Header
                title={title}
                description={description}
                questions={questions}
                onSave={handleSave}
                formId={formId}
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