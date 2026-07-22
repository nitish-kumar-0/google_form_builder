import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {


    const navigate = useNavigate();

    const handleResponses = (id) => {

     navigate(`/responses/${id}`);

    };

    const handleEdit = (id) => {

        navigate(`/edit/${id}`);

    };

    

    const [forms, setForms] = useState([]);

    useEffect(() => {

        fetchForms();

    }, []);

    const fetchForms = async () => {

        try {

            const res = await axios.get("http://localhost:5000/api/forms");

            setForms(res.data.forms);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleDelete = async (id) => {

    try {

        await axios.delete(`http://localhost:5000/api/forms/${id}`);

        alert("Form Deleted Successfully ✅");

        fetchForms();

    }

    catch (error) {

        console.log(error);

        alert("Unable to Delete Form ❌");

    }

};

    return (

       

    <div className="dashboard">

        <h1>My Forms</h1>

        <div className="forms-grid">

            {
                forms.map((form) => (

                    <div
                        className="form-card"
                        key={form._id}
                    >

                        <div className="card-top"></div>

                        <div className="card-body">

                            <h3>
                                {form.title}
                            </h3>

                            <p>
                                {form.description}
                            </p>

                        </div>

                        <div className="card-footer">

                            <button>
                                👁 Preview
                            </button>

                            <button
                                onClick={() => handleEdit(form._id)}
                            >
                                ✏ Edit
                            </button>

                            <button
                                className="responsesBtn"
                                onClick={() => handleResponses(form._id)}
                            >
                                📊 Responses
                            </button>

                            <button
                                onClick={() => handleDelete(form._id)}
                            >
                                🗑 Delete
                            </button>

                        </div>

                    </div>

                ))
            }

        </div>

    </div>

);
    

}

export default Dashboard;