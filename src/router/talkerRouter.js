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
const { readTalkerFile, writeTalkerFile } = require('../utils/readWriteTokenFile');

const router = express.Router();

router.get('/', async (_req, res) => {
  const response = await readTalkerFile();
  return res.status(200).json(response);
});

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

module.exports = router;