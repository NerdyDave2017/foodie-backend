const { generateLongLowercaseUuid } = require("custom-uuid");
const generateTrackingCode = () => {
  return `tr-${generateLongLowercaseUuid()}`;
};

module.exports = generateTrackingCode;
