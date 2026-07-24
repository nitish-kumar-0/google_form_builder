import {
  MdAdd,
  MdContentCopy,
  MdDeleteOutline,
  MdArrowDownward,
  MdMoreVert
} from "react-icons/md";

import "./ToolBox.css";



function ToolBox({
  handleAddQuestion,
  handleCopyQuestionOnToolBox,
  handleDeleteQuestionOnToolBox
}) {
  return (
    <div className="toolBox">

      <button     onClick={handleAddQuestion} title="Add Question">
        <MdAdd />
      </button>

      <button onClick={handleCopyQuestionOnToolBox} title="Duplicate">
        <MdContentCopy />
      </button>

      <button onClick={handleDeleteQuestionOnToolBox} title="Delete">
        <MdDeleteOutline />
      </button>

      <button title="Move">
        <MdArrowDownward />
      </button>

      <button title="More">
        <MdMoreVert />
      </button>

    </div>
  );
}

export default ToolBox;