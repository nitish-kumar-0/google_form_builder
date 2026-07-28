const express = require("express");

const router = express.Router();

const { submitResponse ,
         getResponses ,
         exportResponses
         } = require("../controllers/responseController");






router.post("/forms/:id/responses",submitResponse);

router.get("/forms/:id/responses", getResponses  );
router.get("/forms/:id/export", exportResponses);


module.exports = router;