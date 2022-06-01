const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header and send request to protected routes
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'No token,authorization denied(You are logged in)' });
    // 401-> UNAUTHORIZED
  }

  // verify token

  try {
    const decoded = jwt.verify(
      token,
      config.get('jwtSecret')
    ); /*To decode the token to its original form */
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Token is not valid',
    });
  }
};
