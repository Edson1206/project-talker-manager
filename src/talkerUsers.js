const { readFile } = require('fs').promises;
const path = require('path');

const pathName = path.resolve(__dirname, '.', 'talker.json');

const users = async () => {
  const response = await readFile(pathName);
  return JSON.parse(response);
};

module.exports = {
  users,
};