const express = require('express');
const { existingId } = require('../middlewares/idValidationMiddlewares');
const { readTalkerFile } = require('../utils/readWriteTokenFile');

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

module.exports = router;