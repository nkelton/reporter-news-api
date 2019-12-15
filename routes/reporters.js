var express = require("express");
var router = express.Router();
const reporterService = require("../service/reporter-service");
const storyService = require("../service/story-service");
const schemas = require("../validation/schema/reporter");
const validator = require("../validation/validator");

// routes
router.get("/", getAll);
router.get("/:id", getById);
router.get("/:id/stories", getByReporterId);
router.post("/", validator(schemas.reporterPOST, "body"), create);
router.put("/:id", validator(schemas.reporterPUT, "body"), update);
//TODO - add story ids to reporter
// router.put("/:id/stories", addStoryToReporter)
router.delete("/:id", _delete);

module.exports = router;

function getAll(req, res, next) {
  reporterService
    .getAll()
    .then(reporter => res.json(reporter))
    .catch(err => next(err));
}

function getById(req, res, next) {
  reporterService
    .getById(req.params.id)
    .then(reporter =>
      reporter ? res.json(reporter) : res.json({ error: err })
    )
    .catch(err => next(err));
}

function getByReporterId(req, res, next) {
  storyService
    .getByReporterId(req.params.id)
    .then(story => (story ? res.json(story) : res.sendStatus(404)))
    .catch(err => next(err));
}

function create(req, res, next) {
  reporterService
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function update(req, res, next) {
  reporterService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  reporterService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
