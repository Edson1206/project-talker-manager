const express = require('express');
const { emailValidation, passwordValidation } = require('../middlewares/loginValidationMiddleware');
const { generateToken } = require('../utils/readWriteTokenFile');

const router = express.Router();

router.post('/', emailValidation, passwordValidation, (_req, res) => {
  const tokenGenerated = generateToken();

  return res.status(200).json({ token: tokenGenerated });
});

module.exports = router;
