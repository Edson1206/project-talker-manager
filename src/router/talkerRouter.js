const express = require('express');
const { existingId } = require('../middlewares/idValidationMiddleware');
const { 
  authValidation,
  nameValidation, 
  ageValidation,
  talkValidation,
  watchValidation,
  rateValidation,
  rateIsIntegerValidation,
} = require('../middlewares/talkerValidationMiddleware');
const { 
  readTalkerFile, 
  writeTalkerFile, 
  deleteTalkerFile,
  searchTalkerByName, 
} = require('../utils/readWriteTokenFile');

const router = express.Router();

router.get('/', async (_req, res) => {
  const response = await readTalkerFile();
  return res.status(200).json(response);
});

router.get('/search', authValidation, searchTalkerByName);

router.get('/:id', existingId, async (req, res) => {
  const id = Number(req.params.id);
  const allUsers = await readTalkerFile();
  const talker = allUsers.find((t) => t.id === id);
  res.json(talker);
});

router.post('/',
  authValidation, 
  nameValidation, 
  ageValidation,
  talkValidation,
  watchValidation,
  rateValidation,
  rateIsIntegerValidation,
  async (req, res) => {
  const info = req.body;
  const talkers = await readTalkerFile();
  info.id = talkers.length + 1;
  
  await writeTalkerFile(info);
  res.status(201).json(info);
});

router.put('/:id', 
  authValidation, 
  nameValidation, 
  ageValidation,
  talkValidation,
  watchValidation,
  rateValidation,
  rateIsIntegerValidation,
  async (req, res) => {
  const id = Number(req.params.id);
  const talkersList = await readTalkerFile();
  const talker = talkersList.findIndex((t) => t.id === id);
  talkersList[talker] = { ...talkersList[talker], ...req.body };
  await writeTalkerFile(talkersList[talker]);
  res.status(200).json(talkersList[talker]);
});

router.delete('/:id', authValidation, async (req, res) => {
  const id = Number(req.params.id);
  await deleteTalkerFile(id);
  res.status(204).send();
});

module.exports = router;