const { readTalkerFile } = require('../utils/readWriteTokenFile');

const existingId = async (req, res, next) => {
  const id = Number(req.params.id);
  const allUsers = await readTalkerFile();
  if (allUsers.find((t) => t.id === id)) {
    next();
  } else {
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
};

module.exports = existingId;
