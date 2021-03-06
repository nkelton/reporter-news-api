var express = require("express");
var router = express.Router();
const userService = require("../service/user-service");
const schemas = require("../validation/schema/user");
const validator = require("../validation/validator");

// routes
router.get("/", getAll);
router.get("/current", getCurrent);
router.get("/:id", getById);
router.post("/", validator(schemas.userPOST, "body"), register);
router.post("/authenticate", validator(schemas.userAUTH, "body"), authenticate);
router.put("/:id", validator(schemas.userPUT, "body"), update);
router.delete("/:id", _delete);
router.put(
  "/:id/reporters",
  validator(schemas.reporterForUserPUT, "body"),
  addReporterForUser
);
router.delete(
  "/:id/reporters",
  validator(schemas.reporterForUserDELETE, "body"),
  deleteReporterForUser
);

module.exports = router;

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then(user =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Username or password is incorrect" })
    )
    .catch(err => next(err));
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  userService
    .getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

function getCurrent(req, res, next) {
  userService
    .getById(req.user.sub)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
}

function update(req, res, next) {
  userService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  userService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function addReporterForUser(req, res, next) {
  userService
    .addReporterForUser(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function deleteReporterForUser(req, res, next) {
  userService
    .deleteReporterForUser(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}
