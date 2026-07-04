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

        <textarea  placeholder ="Type your long answer"
          rows="7"
           cols="86.5"  > </textarea>
        
        
        
        

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
const previewContainer = document.querySelector(".previewContainer");

previewBtn.addEventListener("click", () => {

    previewContainer.innerHTML = "";

    const questions = document.querySelectorAll(".questionItem");

    questions.forEach(question => {

        const questionText = question.querySelector(".upper input").value;

        const type = question.querySelector(".questionType").value;

        if (type === "short") {

            previewContainer.innerHTML += `

                <div class="preview-question">

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

                <div class="preview-question">

                    <h3>${questionText}</h3>

                      <textarea  placeholder ="Type your long answer" rows="7" cols="86.5"  >


                     </textarea>

                </div>

            `;
        }
        
        else if (type === "mcq") {

        

         const options = question.querySelectorAll(".option-row input[type='text']");

            let optionHTML = "";

             options.forEach(option => {

              optionHTML += `
                <div>
                    <input type="radio" name="${questionText}">
                    <label>${option.value}</label>
                </div>
            `;

            });

        previewContainer.innerHTML += `
            <div class="preview-question">

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
            <div class="preview-question">

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
            <div class="preview-question">

                <h3>${questionText}</h3>

                <select>
                    <option selected disabled>Select an option</option>

                    ${optionHTML}

                </select>

            </div>
        `;



        }
        
    });

});

