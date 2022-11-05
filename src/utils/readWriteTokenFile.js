const { readFile } = require('fs').promises;
const path = require('path');

const readTalkerFile = async () => {
  const pathName = path.resolve(__dirname, '../talker.json');
  try {
  const response = await readFile(pathName);
  return JSON.parse(response);
  } catch (error) {
    console.error(`Erro: ${error}`);
  }
};

module.exports = {
  readTalkerFile,
};