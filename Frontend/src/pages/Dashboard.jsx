import Navbar from "../components/Navbar";
import FormCard from "../components/FormCard";
import "./Dashboard.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";



function Dashboard() {
const navigate = useNavigate();




const [forms, setForms] = useState([]);

const fetchForms = async () => {

    try {

        const res = await api.get("/forms");

        setForms(res.data.forms);

    }

    catch (error) {

        console.log(error);

    }

};

useEffect(() => {

    fetchForms();

}, []);

const handleDelete = async (id) => {

    try {

        await api.delete(`/forms/${id}`);

        fetchForms();

    }

    catch (error) {

        console.log(error);

    }

};


    return (

        <>

            <Navbar />

            <div className="dashboard">

                <div className="hero">

                    <h1>

                        Welcome Back 

                    </h1>

                    <p>

                        Create, manage and analyze all your forms in one place.

                    </p>

                </div>

                <div className="search-section">

                    <input

                        type="text"

                        placeholder="Search Forms..."

                    />

                </div>

                <h2>

                    Start a New Form

                </h2>

                <div className="create-card"   onClick={()=>navigate("/create")}>

                    <div className="plus">

                        +

                    </div>

                    <h3>

                        Blank Form

                    </h3>

                </div>

                <h2>

                    Recent Forms

                </h2>

                <div className="form-grid">

                    {

                        forms.map((form)=>(

                            <FormCard

                                key={form._id}

                                form={form}

                                onPreview={(id)=>navigate(`/preview/${id}`)}

                                onEdit={(id)=>navigate(`/edit/${id}`)}

                                onResponses={(id)=>navigate(`/responses/${id}`)}

                                onDelete={handleDelete}

                            />

                        ))

                    }

                </div>

            </div>

        </>

    );

}

export default Dashboard;