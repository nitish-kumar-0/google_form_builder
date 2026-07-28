const auth = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const { createForm ,
        getForms , 
        getFormById , 
        updateForm , 
        deleteForm ,
        
        } = require("../controllers/formController");


router.post("/forms", auth, createForm);

router.get("/forms", auth, getForms);

router.get("/forms/:id", getFormById);

router.put("/forms/:id", auth, updateForm);

router.delete("/forms/:id", auth, deleteForm);


module.exports = router;