import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYD",
  11
);
const generateShortCode = () => {
  return nanoid();
};

module.exports = generateShortCode;
