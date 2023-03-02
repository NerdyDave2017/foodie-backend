const bcrypt = require("bcrypt");

const matchPassword = async (enteredPassword, password) => {
  try {
    return await bcrypt.compare(enteredPassword, password);
  } catch (err) {
    console.log(err);
  }
};

module.exports = matchPassword;
