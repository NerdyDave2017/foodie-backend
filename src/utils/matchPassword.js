const bcrypt = require("bcrypt");
const matchPassword = async (enteredPassword, password) => {
  return await bcrypt.compare(enteredPassword, password);
};

module.exports = matchPassword;
