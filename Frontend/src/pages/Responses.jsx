import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Responses.css";
import axios from "axios";

function Responses() {

    const { id } = useParams();

    const [form, setForm] = useState(null);

    const [responses, setResponses] = useState([]);

    const fetchData = async () => {

    try {

        const formRes = await axios.get(
            `http://localhost:5000/api/forms/${id}`
        );

        const responseRes = await axios.get(
            `http://localhost:5000/api/forms/${id}/responses`
        );

        setForm(formRes.data.form);

        setResponses(responseRes.data.responses);

    }

    catch (error) {

        console.log(error);

    }

};

useEffect(() => {

    fetchData();

}, [id]);

   if (!form) {
        return <h2>Loading...</h2>;
    }


    if (responses.length === 0) {

        return (

            <div className="responses-container">

                <h1>{form.title}</h1>

                <h3>No responses yet.</h3>

            </div>

        );

    }

   return (

    <div className="responses-container">

        <h1>{form?.title}</h1>

        <h3>Total Responses : {responses.length}</h3>

        {
            responses.map((response, index) => (


                

                <div
                    key={response._id}
                    className="response-card"
                >

                    <h2>Response {index + 1}</h2>

                    <p>
                        Submitted On :
                        {new Date(response.createdAt).toLocaleString()}
                    </p>

                    {

                        
                        response.answers.map((ans) => {

                            const question = form?.questions.find(

                                (q) =>
                                    q._id.toString() ===
                                    ans.questionId.toString()

                            );

                            return (

                                <div
                                    key={ans._id}
                                    className="answer-item"
                                >

                                    <h4>
                                        {question?.questionText || "Question Deleted"}
                                    </h4>

                                    <p>{ans.answer || "No Answer"}</p>

                                </div>

                            );

                        })
                    }

                </div>

            ))
        }

    </div>

);

}

export default Responses;