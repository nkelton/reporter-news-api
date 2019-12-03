var express = require("express");
var router = express.Router();
const muckrackService = require("../service/muckrack-service");

/* GET stories. */
router.get("/stories", async function(req, res, next) {
  muckrackService.getStoriesFor(res, next, req.query.reporter);
});

module.exports = router;
