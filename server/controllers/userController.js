const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");

const generateJwt = (id, login) => {
  return jwt.sign({ id, login }, process.env.SECRET_KEY, { expiresIn: "24h" });
};
class userController {
  async registration(req, res) {
    const { login, password } = req.body;
    if (!login || !password) {
      return next(ApiError.badRequest("неправильний логін чи пароль"));
    }
    const candidate = await User.findOne({ where: { login } });
    if (candidate) {
      return next(ApiError.badRequest("користувач з таким логіном вже існує"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ login, password: hashPassword });
    const token = generateJwt(user.id, user.login);
    return res.status(200).json({ token: token });
  }

  async login(req, res, next) {
    const { login, password } = req.body;
    const user = await User.findOne({ where: { login } });
    if (!user) {
      return next(ApiError.internal("користувач не знайден"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("неправильний пароль"));
    }
    const token = generateJwt(user.id, user.login);
    return res.status(200).json({ token: token });
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.login);
    return res.status(200).json({ token: token });
  }
}

module.exports = new userController();
