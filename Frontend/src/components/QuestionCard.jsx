
import QuestionFooter from "./QuestionFooter";
import ToolBox from "./ToolBox";

import "./QuestionCard.css";

function QuestionCard({


  question,
  index,
  questions,
  setQuestions,
  activeQuestion,
  setActiveQuestion,
  handleAddQuestion,
 
   



}) {

  const handleQuestionChange = (e) => {

    const updatedQuestions = [...questions];

    updatedQuestions[index].questionText = e.target.value;

    setQuestions(updatedQuestions);

  };

  const handleTypeChange = (e) => {

    const updatedQuestions = [...questions];

    updatedQuestions[index].type = e.target.value;

    setQuestions(updatedQuestions);

  };

  const handleAddOption = () => {

    const updatedQuestions = [...questions];

    updatedQuestions[index].options.push(
        `Option ${updatedQuestions[index].options.length + 1}`
    );

    setQuestions(updatedQuestions);

};

const handleOptionChange = (optionIndex, value) => {

    const updatedQuestions = [...questions];

    updatedQuestions[index].options[optionIndex] = value;

    setQuestions(updatedQuestions);

};

const handleDeleteOption = (optionIndex) => {

    const updatedQuestions = [...questions];

    updatedQuestions[index].options.splice(optionIndex, 1);

    setQuestions(updatedQuestions);

};



  const handleDeleteQuestionOnToolBox = () => {

    if (questions.length === 1) {
      alert("At least one question is required.");
      return;
    }

    const updatedQuestions = questions.filter((_, i) => i !== index);

    setQuestions(updatedQuestions);

  };


  const handleCopyQuestionOnToolBox = () => {

    const copiedQuestion = {

        ...question,

        id: Date.now(),

        options: [...question.options]

    };

    const updatedQuestions = [...questions];

    updatedQuestions.splice(index + 1, 0, copiedQuestion);

    setQuestions(updatedQuestions);

};




  return (

   <div
        className="question-card"
        onClick={() => setActiveQuestion(index)}
   >

      <div className="question-header">

        <input
          className="question-input"
          type="text"
          placeholder="Type your question"
          value={question.questionText}
          onChange={handleQuestionChange}
        />

        <select
          className="question-type"
          value={question.type}
          onChange={handleTypeChange}
        >

          <option value="short">Short Answer</option>

          <option value="para">Paragraph</option>

          <option value="mcq">Multiple Choice</option>

          <option value="checkbox">Checkbox</option>

          <option value="dropdown">Dropdown</option>

        </select>

      </div>

        <div className="question-body">

            {
                question.type === "short" && (
                <input
                    className="answer-input"
                    type="text"
                    placeholder="Short answer text"
                    disabled
                />
                )
            }

            {
                question.type === "para" && (
                <textarea
                    className="answer-textarea"
                    placeholder="Long answer text"
                    disabled
                />
                )
            }

        {
          (question.type === "mcq" ||
          question.type === "checkbox" ||
          question.type === "dropdown") && (

          <div className="options">

              {
              question.type === "dropdown" ? (

                <select className="dropdown-preview">

                    {
                        question.options.map((option, i) => (

                            <option key={i}>
                                {option}
                            </option>

                        ))
                    }

                </select>

            ) : (

                question.options.map((option, i) => (

                    <div className="option-row" key={i}>

                        <input
                            type={question.type === "mcq" ? "radio" : "checkbox"}
                            disabled
                        />

                        <input
                            type="text"
                            value={option}
                            onChange={(e)=>handleOptionChange(i,e.target.value)}
                            className="option-input"
                        />

                        <button
                            className="delete-option-btn"
                            onClick={()=>handleDeleteOption(i)}
                        >
                            ❌
                        </button>

                    </div>

                ))

            )
        }

        <button
            className="add-option-btn"
            onClick={handleAddOption}
        >
            + Add Option
        </button>

    </div>



       )
      }


      


          
      </div>

     <QuestionFooter
          question={question}
          index={index}
          questions={questions}
          setQuestions={setQuestions}
      />
            {
                activeQuestion === index && (
                    <ToolBox 
                      
                        handleAddQuestion={() => handleAddQuestion(index)}
                        handleDeleteQuestionOnToolBox={()=>handleDeleteQuestionOnToolBox(index)}
                        handleCopyQuestionOnToolBox={()=>{ handleCopyQuestionOnToolBox(index)}}
                    

                    />
                )
            }
    </div>
    


  );

}

export default QuestionCard;