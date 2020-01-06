const config = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  addReporterForUser,
  deleteReporterForUser
};

async function authenticate({ phone, password }) {
  const user = await User.findOne({ phone: phone });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user.id }, config.secret);
    return {
      ...userWithoutHash,
      token
    };
  }
}

async function getAll() {
  return await User.find().select("-hash");
}

async function getById(id) {
  return await User.findById(id).select("-hash");
}

async function create(userParam) {
  if (await User.findOne({ phone: userParam.phone })) {
    throw 'Phone "' + userParam.phone + '" is already taken';
  }

  const user = new User(userParam);

  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  await user.save();
}

async function update(id, userParam) {
  const user = await User.findById(id);

  if (!user) throw "User not found";
  if (
    user.phone !== userParam.phone &&
    (await User.findOne({ phone: userParam.phone }))
  ) {
    throw 'Phone number "' + userParam.phone + '" is already taken';
  }

  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  Object.assign(user, userParam);

  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}

async function addReporterForUser(id, reporter) {
  await User.update({ _id: id }, { $addToSet: { name: reporter.name } });
}

async function deleteReporterForUser(id, reporter) {
  await User.update({ _id: id }, { $pull: { name: reporter.name } });
}
