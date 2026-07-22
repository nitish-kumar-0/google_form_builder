const express = require("express");

const router = express.Router();

const { submitResponse , getResponses  } = require("../controllers/responseController");






router.post("/forms/:id/responses",submitResponse);

router.get("/forms/:id/responses", getResponses  );


module.exports = router;