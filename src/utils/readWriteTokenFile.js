const { readFile } = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const readTalkerFile = async () => {
  const pathName = path.resolve(__dirname, '../talker.json');
  try {
  const response = await readFile(pathName);
  return JSON.parse(response);
  } catch (error) {
    console.error(`Erro: ${error}`);
  }
};

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = {
  readTalkerFile,
  generateToken,
};