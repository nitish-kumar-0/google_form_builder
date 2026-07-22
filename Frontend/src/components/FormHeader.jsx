import "./FormHeader.css";

function FormHeader() {

    return (

        <div className="formTitle">

            <h2>

                <input
                    type="text"
                    placeholder="Untitled Form"
                />

            </h2>

            <hr />

            <div className="title">

                <input
                    type="text"
                    placeholder="Form Description"
                />

            </div>

        </div>

    );

}

export default FormHeader;