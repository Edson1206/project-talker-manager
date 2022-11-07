const emailValidation = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);

  if (!email) {
    return res.status(400).json(
      { message: 'O campo "email" é obrigatório' },
    );
  }

  if (!emailRegex) {
    return res.status(400).json(
      { message: 'O "email" deve ter o formato "email@email.com"' },
    );
  }
  next();
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json(
      { message: 'O campo "password" é obrigatório' },
    );
  }

  if (password.length < 6) {
    return res.status(400).json(
      { message: 'O "password" deve ter pelo menos 6 caracteres' },
    );
  }
  next();
};

module.exports = {
  emailValidation,
  passwordValidation,
};