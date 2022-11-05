const express = require('express');
const { generateToken } = require('../utils/readWriteTokenFile');

const router = express.Router();

router.post('/', (_req, res) => {
  const tokenGenerated = generateToken();

  return res.status(200).json({ token: tokenGenerated });
});

module.exports = router;
