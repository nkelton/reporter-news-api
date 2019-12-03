const config = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Story = require("../models/Story");

module.exports = {
  getByReporterName,
  getById,
  create,
  update,
  delete: _delete
};

async function getByReporterName(name) {
  const reporter = await Reporter.find();
  const story = await Story.find({ reporterId: reporter.id });
}

async function getById(id) {
  return await Story.findById(id).select("-hash");
}

async function create(storyParam) {
  // validate
  if (await Story.findOne({ username: userParam.username })) {
    throw 'Story "' + storyParam.title + '" is already taken';
  }

  const story = new Story(storyParam);

  // save user
  await story.save();
}

async function update(id, storyParam) {
  const story = await Story.findById(id);

  // validate
  if (!story) throw "User not found";

  // copy userParam properties to user
  Object.assign(story, storyParam);

  await story.save();
}

async function _delete(id) {
  await Story.findByIdAndRemove(id);
}
