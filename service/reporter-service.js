const Reporter = require("../models/Reporter");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll() {
  return await Reporter.find().select("-hash");
}
async function getById(id) {
  return await Reporter.findById(id).select("-hash");
}

async function create(reporterParam) {
  if (await Reporter.findOne({ name: reporterParam.name })) {
    throw 'Reporter "' + reporterParam.name + '" is already taken';
  }

  const reporter = new Reporter(reporterParam);

  await reporter.save();
}

async function update(id, reporterParam) {
  const reporter = await Reporter.findById(id);

  if (!reporter) throw "Reporter not found";

  Object.assign(reporter, reporterParam);

  await reporter.save();
}

async function _delete(id) {
  await Reporter.findByIdAndRemove(id);
}
