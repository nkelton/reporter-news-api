module.exports = {
  cleanName
};

function cleanName(dirtyName) {
  const reporterNameArray = dirtyName.split("-");
  const firstName =
    reporterNameArray[0].charAt(0).toUpperCase() +
    reporterNameArray[0].substring(1);

  const lastName =
    reporterNameArray[1].charAt(0).toUpperCase() +
    reporterNameArray[1].substring(1);

  return firstName + " " + lastName;
}
