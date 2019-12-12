var express = require("express");
var router = express.Router();
const muckrackService = require("../service/muckrack-service");

router.get("/articles", getStories);

module.exports = router;

function getStories(req, res, next) {
  return muckrackService.getStoriesFor(res, next, req.query.reporter);
}
