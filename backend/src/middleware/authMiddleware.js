const jwt = require('jsonwebtoken');
const config = require('../config');

exports.authenticate = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  if (!authorizationHeader) {
    return res.status(401).json({ error: 'Missing authorization header' });
  }
  // const token = authorizationHeader;
  const token = authorizationHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
