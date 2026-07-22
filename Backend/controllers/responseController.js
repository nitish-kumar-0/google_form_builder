
const Form = require("../models/Form");
const Response = require("../models/Response");


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

        const response = new Response({formId:id , answers});

             if (!answers || answers.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Answers are required"
                });
            }

        // Step 4
       await response.save();

        res.status(201).json({
            success: true,
            message: "Response submitted successfully",
            response
        });

        // Step 5

        res.status(201).json({
            success:true,
            message:"response has been collected"
        })

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


module.exports = {submitResponse ,getResponses}