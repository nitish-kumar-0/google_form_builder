const express = require("express");
const router = express.Router();

const { createForm , getForms , getFormById , updateForm , deleteForm ,submitResponse  } = require("../controllers/formController");

router.post("/forms", createForm);

router.get("/forms", getForms);

router.get("/forms/:id", getFormById);

router.put("/forms/:id",updateForm);

router.delete("/forms/:id",deleteForm);


module.exports = router;