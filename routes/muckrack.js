var express = require("express");
var router = express.Router();
const muckrackService = require("../service/muckrack-service");
const schemas = require("../validation/schema/muckrack");
const validator = require("../validation/validator");

router.get("/articles", validator(schemas.articleGET, "query"), getStories);

module.exports = router;

function getStories(req, res, next) {
  return muckrackService.getStoriesFor(res, next, req.query.reporter);
}
