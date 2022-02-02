const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/me", function (req, res, next) {
  res.send("introduce myself");
});

module.exports = router;
