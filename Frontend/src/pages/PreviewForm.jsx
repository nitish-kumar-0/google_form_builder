import { useLocation } from "react-router-dom";

function PreviewForm() {

    const { state } = useLocation();

    const form = state;

    return (

        <div>

            <h1>{form.title}</h1>

            <p>{form.description}</p>

            <hr />

            {
                form.questions.map((question) => (

                    <div key={question.id}>

                        <h3>{question.questionText}</h3>

                    </div>

                ))
            }

        </div>

    );

}

export default PreviewForm;