const Form = require("../models/Form");
// const Response = require("../models/Response");
const createForm = async (req, res) => {

 try{
    const form = new Form(req.body);

    await form.save();

    res.status(201).json({
        message: "Form saved successfully",
        data: form
    });

    }

    catch(error){
       res.status(500).json({
        message: "Failed to save form",
        error: error.message
    });
    }


};

const getForms = async(req,res)=>{
 try{
   const forms = await Form.find();
   res.status(200).json({
    success: true,
    count: forms.length,
    forms
    });

   }

     catch(error){
       res.status(500).json({
        message: "something went wrong!",
        error: error.message
    });
    }
   
};

const getFormById = async (req , res )=>{

    try{
        const { id } = req.params;

        const form = await Form.findById(id);
        
        if(!form){
           return res.status(404).json({
               success:false,
               message:"Form not found"

            })
         
        }

        res.json({
            success:true,
            form

        });

    }

    catch(error){
        res.status(500).json({
        message: "something went wrong!",
        error: error.message
       });
    };

};

const updateForm = async (req , res)=>{

    try{
        const {id} = req.params;
        
        const updatedForm = await Form.findByIdAndUpdate( id , req.body , {new:true,runValidators:true});

        if(!updatedForm){
           return res.status(404).json({
                success:false,
                message:"Form not found !"
            });
        }

        res.status(200).json({
            success:true,

            message:"Form updated successfully",

            form:updatedForm
            })

    }

    catch(error){
        res.status(500).json({
            success:false,
            message:"unable to update!",
            error:error.message
        })
    }

}

const deleteForm = async (req , res) =>{

    try{
        const {id} = req.params;
       const form= await Form.findByIdAndDelete(id);

        if(!form){
            return res.status(404).json({
                success:false,
                message:"Form not found !"
            })
        }

        res.status(200).json({
            success:true,
            message:"Form deleted successfully "
        })

    }

    catch(err){
        res.status(500).json({
            success:false,
            message:"Unable to delete this form !",
            error:err.message
        })
    }
}










module.exports = {
    createForm , getForms , getFormById ,updateForm , deleteForm 
};