const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;

      console.log('Tentativa de registro com dados:', { name, email });

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Senha criptografada:', hashedPassword);

      const user = await User.create({ name, email, password: hashedPassword });
      console.log('Usuário criado com sucesso:', user);

      res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      res.status(500).json({ error: error });
    }
  }


  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

module.exports = AuthController;
