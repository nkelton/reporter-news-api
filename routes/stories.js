var express = require("express");
var router = express.Router();
const storyService = require("../service/story-service");
const schemas = require("../validation/schema/story");
const validator = require("../validation/validator");

// routes
router.get("/", validator(schemas.storyGET, "query"), getAllByParams);
router.get("/:id", getById);
router.post("/", validator(schemas.storyPOST, "body"), create);
router.put("/:id", validator(schemas.storyPUT, "body"), update);
router.delete("/:id", _delete);

module.exports = router;

function getAllByParams(req, res, next) {
  storyService
    .getAllByParams(req.query)
    .then(stories => res.json(stories))
    .catch(err => next(err));
}

function getById(req, res, next) {
  storyService
    .getById(req.params.id)
    .then(story => (story ? res.json(story) : res.sendStatus(404)))
    .catch(err => next(err));
}

function create(req, res, next) {
  storyService
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function update(req, res, next) {
  storyService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  storyService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
