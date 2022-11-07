const { readFile, writeFile } = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const pathName = path.resolve(__dirname, '../talker.json');

const readTalkerFile = async () => {
  try {
  const response = await readFile(pathName, 'utf8');
  return JSON.parse(response);
  } catch (error) {
    console.error(`Erro: ${error}`);
  }
};

const writeTalkerFile = async (talker) => {
  try {
    const readTalker = await readTalkerFile();
    const newTalkerFile = JSON.stringify([...readTalker, talker]);
    await writeFile(path.resolve(pathName), newTalkerFile);
  } catch (error) {
    console.error(`Erro: ${error}`);
  }
};

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

const deleteTalkerFile = async (id) => {
  const talkers = await readTalkerFile();
  const filteredTalkers = talkers.filter((t) => t.id !== id);
  await writeFile(pathName, JSON.stringify(filteredTalkers, null, 2));
};

const searchTalkerByName = async (req, res) => {
  const { q } = req.query;
  const talkers = await readTalkerFile();

  const searchTalkersByName = talkers.filter(
    ({ name }) => name.toUpperCase().includes(q.toUpperCase()),
  );

  res.status(200).json(searchTalkersByName);
};

module.exports = {
  readTalkerFile,
  generateToken,
  writeTalkerFile,
  deleteTalkerFile,
  searchTalkerByName,
};