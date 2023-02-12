const { generateShortUuid } = require("custom-uuid");
const generateShortCode = () => {
  return generateShortUuid();
};

module.exports = generateShortCode;
