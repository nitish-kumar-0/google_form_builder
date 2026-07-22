import "./QuestionFooter.css";
import { MdContentCopy, MdDeleteOutline,MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";





function QuestionFooter({
  question,
  index,
  questions,
  setQuestions,
}) {

  const handleDeleteQuestion = () => {

    if (questions.length === 1) {
      alert("At least one question is required.");
      return;
    }

    const updatedQuestions = questions.filter((_, i) => i !== index);

    setQuestions(updatedQuestions);

  };

  const handleCopyQuestion = () => {

    const copiedQuestion = {

        ...question,

        id: Date.now(),

        options: [...question.options]

    };

    const updatedQuestions = [...questions];

    updatedQuestions.splice(index + 1, 0, copiedQuestion);

    setQuestions(updatedQuestions);

};

const handleRequiredToggle = () => {

    const updatedQuestions = [...questions];

    updatedQuestions[index].required =
        !updatedQuestions[index].required;

    setQuestions(updatedQuestions);

};


const handleMoveUp = () => {

    if (index === 0) return;

    const updatedQuestions = [...questions];

    [updatedQuestions[index], updatedQuestions[index - 1]] = [
        updatedQuestions[index - 1],
        updatedQuestions[index]
    ];

    setQuestions(updatedQuestions);

};

const handleMoveDown = () => {

    if (index === questions.length - 1) return;

    const updatedQuestions = [...questions];

    [updatedQuestions[index], updatedQuestions[index + 1]] = [
        updatedQuestions[index + 1],
        updatedQuestions[index]
    ];

    setQuestions(updatedQuestions);

};


  return (

        <div className="question-footer">

        <MdContentCopy
            className="footer-icon"
            onClick={handleCopyQuestion}
        />

        <MdDeleteOutline
            className="footer-icon"
            onClick={handleDeleteQuestion}
        />

        <MdKeyboardArrowUp
            className="footer-icon"
            onClick={handleMoveUp}
        />

        <MdKeyboardArrowDown
            className="footer-icon"
            onClick={handleMoveDown}
        />

        <label className="required-toggle">

            Required

            <input
                type="checkbox"
                checked={question.required}
                onChange={handleRequiredToggle}
            />

        </label>

    </div>

  );

}

export default QuestionFooter;