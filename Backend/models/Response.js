const mongoose = require("mongoose");


const responseSchema = new mongoose.Schema( 
    {
        formId:{


            type : mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Form",

           

            
            
        },
         

         answers:[
                {
                    questionId :{
                        type:mongoose.Schema.Types.ObjectId,
                        required:true,
                    } ,
                    

                   answer: {
                        type: mongoose.Schema.Types.Mixed,
                        required: true
                    }

                }
            ] ,
           
          
    } ,
    
            {
                  timestamps:true
            }


)

const Response = mongoose.model( "Response" , responseSchema );

module.exports = Response;