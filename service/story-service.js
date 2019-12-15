const Story = require("../models/Story");

module.exports = {
  getAll,
  getById,
  getByReporterId,
  create,
  update,
  delete: _delete
};

async function getAll() {
  return await Story.find().select("-hash");
}

async function getById(id) {
  return await Story.findById(id).select("-hash");
}

async function getByReporterId(reporterId) {
  return await Story.find({ reporterId: reporterId });
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
