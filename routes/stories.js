var express = require("express");
var router = express.Router();

const storyService = require("../service/story-service");

// routes
router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

function getAll(req, res, next) {
  console.log("Getting All!!!");
  storyService
    .getAll()
    .then(story => res.json(story))
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

module.exports = router;