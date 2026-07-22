const container = document.querySelector(".questionBox");

container.addEventListener("change",(event)=>{

   if(event.target.classList.contains("questionType")){

      const select = event.target;

      const card = select.closest(".card");

      const answerField = card.querySelector(".answerField");

       changeQType(select,answerField);

   }

});






function changeQType(select,answerField){

    if(select.value === 'short'){
        answerField.innerHTML =`
            <input

            type="text"

            placeholder="Short answer text"

            />
            
        `;
    }

    else if(select.value === 'para'){

        answerField.innerHTML=`

        <textarea class="longAnswer" placeholder="Type your long answer" rows="7" maxlength="1000"></textarea>

        <div class="charCount">0 / 1000</div>
         `;
        
    }

    else if(select.value === 'mcq'){

   

        answerField.innerHTML= `

        <div class = "options">
            <div class="option-row">
                <input type ="radio" name ="option" >
                 <input type ="text" placeholder="Option"/>
                 <i class="fa-solid fa-xmark deleteOptionBtn"></i>
            </div>

             <div class="option-row">
                <input type ="radio" name ="option" >
                <input type ="text" placeholder="Option"/>
                <i class="fa-solid fa-xmark deleteOptionBtn"></i> 
            </div>

            <button class="add-option" > add option</button>

        </div>
       
        `;

      
    }


    else if(select.value === 'checkbox'){

        answerField.innerHTML=`
            <div class = "options">
            <div class="option-row">
                <input type ="checkbox" name ="option" >
                
                <input type = "text" placeholder="Option"/>
               <i class="fa-solid fa-xmark deleteOptionBtn"></i>
            </div>

             <div class="option-row">
                <input type ="checkbox" name ="option" >
                <input type = "text" placeholder="Option"/>
                <i class="fa-solid fa-xmark deleteOptionBtn"></i>
            </div>

             <button class="add-option" > add option</button>


        </div>
        
        `;

    }

    else if(select.value === 'Dropdown'){

        answerField.innerHTML=`
       
         <div class = "options">
            <div class="option-row">
                 <input type ="text" placeholder="Option"/>
                 <i class="fa-solid fa-xmark deleteOptionBtn"></i>
            </div>

            <button class="add-option" > add option</button>

        </div>

        `;

    }


}




container.addEventListener("click" ,function(event){
    
    
    if(event.target.classList.contains('addIcon')){

        const newCard = `
        
          
   
    <div class="questionItem">
    
       <div class="card">
            <div class="upper">

                <input type="text" placeholder="Type your question" >

                <select name="questionType" class = "questionType" >
                    <option value="short">Ans Type</option>
                    <option value="short">Short Answer</option>
                    <option value="para">Long Answer</option>
                    <option value="mcq">Multiple Choice Question</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="Dropdown">dorpdown</option>

                </select>

            </div>

            <div class="lower">
                <div class="answerField"></div>
            </div>

            
            <div class="cardFooter">

                    <i class="fa-regular fa-copy copyBtn"></i>

                    <i class="fa-solid fa-trash deleteBtn"></i>

                    <label class="requireBox">
                        Required
                        <input type="checkbox">
                    </label>

            </div>
       
       
        </div>

        
            <div class="toolBox">
                <div class="plusIcon">
                    <button class="addIcon">+</button>
                </div>
            </div>

    </div>   
    
        
        `;

        container.insertAdjacentHTML("beforeend", newCard);
         const newQuestion = event.target.closest(".questionItem");
         
         const radios = newQuestion.querySelectorAll("input[type='radio']");
         const randomNum = crypto.randomUUID();
         radios.forEach(radio=>{
        radio.name =  randomNum;
         })
  
    }

})






container.addEventListener("click", function(event){

   
    const card = event.target.closest(".card");

  
    if(!card){
        
    return;

    }



    // const questionItem = card.closest(".questionItem");

    const questionItem = event.target.closest(".questionItem");

   
    const allToolBox = document.querySelectorAll(".toolBox");

    allToolBox.forEach(tool =>{
        tool.classList.remove("showToolBox");
    })

    const toolBox = questionItem.querySelector(".toolBox");

    toolBox.classList.add("showToolBox");



    
if(event.target.classList.contains("deleteBtn")){

    questionItem.remove();
    return;
}

      
if(event.target.classList.contains("copyBtn")){


    //mcq input name = unique ; crypto.uniqueUUID();
    


    toolBox.classList.remove("showToolBox");
    const newQuestion = questionItem.cloneNode(true);
    questionItem.after(newQuestion);

    const radios = newQuestion.querySelectorAll("input[type='radio']");
    const randomNum = crypto.randomUUID();
      radios.forEach(radio=>{
        radio.name =  randomNum;
      })

    const newToolBox = newQuestion.querySelector(".toolBox");

    newToolBox.classList.add("showToolBox");

   
}

if(event.target.classList.contains("add-option")){

    const addOption = event.target;

    const option = event.target.closest(".options");
    const optionRow = option.querySelector(".option-row");

    const newOption = optionRow.cloneNode(true);

    addOption.before(newOption);


}

if(event.target.classList.contains("deleteOptionBtn")){

    const option = event.target.closest(".options");

    const optionRows = option.querySelectorAll(".option-row");

    if(optionRows.length > 2){

        const deleteOptionBtn = event.target;

        const optionRow = deleteOptionBtn.closest(".option-row");

        optionRow.remove();
     }
  
   
   
}

   
    
});



const previewBtn = document.querySelector(".previewBtn");

const backBtn = document.querySelector(".backBtn");

const builderContainer = document.querySelector(".builderContainer");
const previewContainer = document.querySelector(".previewContainer");

previewBtn.addEventListener("click", () => {

    previewContainer.innerHTML = "";

    const questions = document.querySelectorAll(".questionItem");

    questions.forEach(question => {

        const questionText = question.querySelector(".upper input").value;

        const type = question.querySelector(".questionType").value;
        const required = question.querySelector(".requireBox input").checked;



       

        

        if (type === "short") {

            previewContainer.innerHTML += `

                <div class="preview-question" data-required = "${required}">

                    <h3>${questionText}</h3>

                    <input
                        type="text"
                        placeholder="Your answer"
                    />

                </div>

            `;
        }

        
        else if (type === "para") {

            previewContainer.innerHTML += `

                <div class="preview-question"  data-required="${required}">

                    <h3>${questionText}</h3>

                        <textarea class="longAnswer" placeholder="Type your long answer" rows="5" maxlength="1000"></textarea>

                    <div class="charCount">0 / 1000</div>
                </div>

            `;
        }
        
        else if (type === "mcq") {

        

         const options = question.querySelectorAll(".option-row input[type='text']");

            let optionHTML = "";

            options.forEach((option, index) => {

            optionHTML += `
                <div>
                    <input type="radio" name="question">
                    <label>${option.value}</label>
                </div>
            `;

                });


            

           previewContainer.innerHTML += `
            <div class="preview-question" data-required ="${required}">

                <h3>${questionText}</h3>

                ${optionHTML}

            </div>
        `;

 
        }

        else if (type === "checkbox") {

            const options = question.querySelectorAll(".option-row input[type='text']");

            let optionHTML = "";

             options.forEach(option => {

              optionHTML += `
                <div>
                    <input type="checkbox" name="${questionText}">
                    <label>${option.value}</label>
                </div>
            `;

            });

        previewContainer.innerHTML += `
            <div class="preview-question" data-required ="${required}">

                <h3>${questionText}</h3>

                ${optionHTML}

            </div>
        `;

        }

        else if (type === "Dropdown") {


        const options = question.querySelectorAll(".option-row input[type='text']");

        let optionHTML = "";

        options.forEach(option => {

            optionHTML += `
                <option>${option.value}</option>
            `;

        });

        previewContainer.innerHTML += `
            <div class="preview-question" data-required ="${required}">

                <h3>${questionText}</h3>

                <select>
                    <option selected disabled>Select an option</option>

                    ${optionHTML}

                </select>

            </div>
        `;



        }

    });

        builderContainer.style.display = "none";

        previewContainer.style.display = "block";

        backBtn.style.display = "inline-block";


        previewContainer.innerHTML += `
        <button class="submitBtn">Submit</button>
           `;

    

           

       
});

previewContainer.addEventListener("input", (event) => {

    if (event.target.classList.contains("longAnswer")) {

        const textarea = event.target;
        const count = textarea.nextElementSibling;

        count.textContent = `${textarea.value.length} / 1000`;

    }

});


previewContainer.addEventListener("click", (event) => {

    if(event.target.classList.contains("submitBtn")){

       const previewQuestions = previewContainer.querySelectorAll(".preview-question");

       let isValid = true;

       previewQuestions.forEach(question => {

        const questionText = question.querySelector("h3").textContent;

        const textInput = question.querySelector("input[type='text']");

        const textarea = question.querySelector("textarea");

        const radioBtn = question.querySelector("input[type='radio']:checked");
        const radios = question.querySelectorAll("input[type='radio']");

        const checkedBoxes = question.querySelectorAll("input[type='checkbox']:checked");
        const checkboxes = question.querySelectorAll("input[type='checkbox']");

        const select = question.querySelector("select");

        const required = question.dataset.required === "true";




            if (textInput) {
            // Short answer validation
                        
                if (required && textInput.value.trim() === "") {

                alert(`${questionText} is required`);

                isValid = false;
                    return;
                }

                 console.log(questionText, textInput.value);


            }

            else if (textarea) {
                // Paragraph validation
                if (required  && textarea.value.trim() === "") {

                alert(`${questionText} is required`);

                isValid = false;
                return;

             }

              console.log(questionText, textarea.value);

            }

            else if (radios.length > 0) {
            // MCQ validation

                if (required && !radioBtn) {

                alert(`${questionText} is required`);

                isValid = false;
                return;

                }

                 console.log(questionText, radioBtn.nextElementSibling.textContent);
            }

            else if (checkboxes.length > 0) {
            // Checkbox validation
                
                if (required && checkedBoxes.length === 0) {

                        alert(`${questionText} is required`);

                        isValid = false;
                        return;

                    }

                     let answer = [];
                        checkedBoxes.forEach(box => {

                        answer.push(box.nextElementSibling.textContent)
                        
                        });

                        console.log(questionText, answer);
            }

            else if (select) {
            // Dropdown validation

                if (
                    required &&
                    select.selectedIndex === 0
                ) {

                    alert(`${questionText} is required`);

                    isValid = false;
                    return;

                }
                const answer = select.options[select.selectedIndex].text;

                console.log(questionText, answer);

         }



     

    });

      if(!isValid){
        return;
       }

       }

     

});

backBtn.addEventListener("click", () => {

    previewContainer.style.display = "none";

    builderContainer.style.display = "block";

    backBtn.style.display = "none";

});