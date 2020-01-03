const Story = require("../models/Story");
const stringUtil = require("../util/string-util");

module.exports = {
  getAllByParams,
  getById,
  create,
  update,
  delete: _delete
};

async function getAllByParams(params) {
  const reporterName = stringUtil.cleanName(params.reporterName);
  return await Story.find({ reporterName: reporterName });
}

async function getById(id) {
  return await Story.findById(id).select("-hash");
}

async function create(storyParam) {
  if (await Story.findOne({ link: storyParam.link })) {
    throw 'Story "' + storyParam.link + '" is already taken';
  }

  const story = new Story(storyParam);

  await story.save();
}

async function update(id, storyParam) {
  const story = await Story.findById(id);

  if (!story) throw "User not found";

  Object.assign(story, storyParam);

  await story.save();
}

async function _delete(id) {
  await Story.findByIdAndRemove(id);
}
