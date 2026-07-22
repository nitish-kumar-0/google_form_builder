import "./ToolBox.css";

function ToolBox({ handleAddQuestion }) {
  return (
    <div className="toolBox">

      <button
        className="tool-btn"
        onClick={handleAddQuestion}
      >
        +
      </button>

    </div>
  );
}

export default ToolBox;