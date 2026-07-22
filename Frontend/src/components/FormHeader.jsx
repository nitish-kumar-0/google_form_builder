import "./FormHeader.css";

function FormHeader({
    title,
    setTitle,
    description,
    setDescription
}) {

    return (

        <div className="formTitle">

            <input
                className="form-title-input"
                type="text"
                placeholder="Untitled Form"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                className="form-description-input"
                type="text"
                placeholder="Form Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

        </div>

    );

}

export default FormHeader;