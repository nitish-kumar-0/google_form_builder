
const Form = require("../models/Form");
const Response = require("../models/Response");
const { Parser } = require("json2csv");


const submitResponse = async (req, res) => {

    try{

        // Step 1
        const {id} = req.params;

        // Step 2
        const answers = req.body.answers;

        // Step 3

        const form = await Form.findById(id);

        if(!form){

             return res.status(404).json({
                success: false,
                message: "Form not found"
            });
        }
        
        if (!answers || answers.length === 0) {

            return res.status(400).json({
                success: false,
                message: "Answers are required"
            });

        }

        const response = new Response({
            formId: id,
            answers
        });

        // Step 4
       await response.save();

        res.status(201).json({
            success: true,
            message: "Response submitted successfully",
            response
        });

        // Step 5


    }

    catch(error){
        res.status(500).json({
            success:false,
            message:"Something went wrong!",
            error:error.message
        })
    }

}


const  getResponses = async (req,res)=>{
try{

     const {id} = req.params;

    const form = await Form.findById(id);

    if(!form){
        return res.status(404).json({
            success:false,
            message:"form not found"

        })
    }

    const responses =  await Response.find({formId:id});

    res.status(200).json({
        success:true,
        count:responses.length,
        responses

    })


}

catch(error){
    res.status(500).json({
        success:false,
        message:"failed to connect",
        error:error.message
    })
}
   
}


const exportResponses = async (req, res) => {

    try {

        const { id } = req.params;

        const form = await Form.findById(id);

        if (!form) {

            return res.status(404).json({

                success: false,

                message: "Form not found"

            });

        }

        const responses = await Response.find({

            formId: id

        });

    const csvData = responses.map((response) => {

            const row = {

                submittedAt: response.createdAt

                };

                response.answers.forEach((ans) => {

                        const question = form.questions.find(

                            (q) => q._id.toString() === ans.questionId.toString()

                        );

                        if (question) {

                            row[question.questionText] = Array.isArray(ans.answer)
                                ? ans.answer.join(", ")
                                : ans.answer;

                        }

                });

        return row;

    
    });

    const parser = new Parser();

    const csv = parser.parse(csvData);

    res.header("Content-Type", "text/csv");

    res.attachment("responses.csv");

    return res.send(csv);



        res.json({

            success: true,

            totalResponses: responses.length

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

 


module.exports = {submitResponse ,getResponses , exportResponses }