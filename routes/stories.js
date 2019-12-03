var express = require("express");
var router = express.Router();

const storyService = require("../service/story-service");

// routes
router.get("/", getByReporter);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

function getByName(req, res, next) {
  storyService.getByReporter(req.params.name);
}

function getById(req, res, next) {
  storyService
    .getById(req.params.id)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
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
