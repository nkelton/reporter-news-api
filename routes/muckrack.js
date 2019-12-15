var express = require("express");
var router = express.Router();
const muckrackService = require("../service/muckrack-service");
const schema = require("../validator-schema/article-query");
const validator = require("../_helpers/request-validator");

router.get("/articles", validator(schema), getStories);

module.exports = router;

function getStories(req, res, next) {
  return muckrackService.getStoriesFor(res, next, req.query.reporter);
}
