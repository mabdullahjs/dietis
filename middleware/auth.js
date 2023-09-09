const jwt = require('jsonwebtoken');

// isAuthenticated middleware
const isAuthenticated = (req, res, next) => {
    const token = req.cookies.accessToken;
  
    if (!token) {
      return res.status(401).json({ message: 'Authorization failed: No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Authorization failed: Invalid token' });
    }
  };
  
  // authorizedRole middleware
  const authorizedRole = (role) => {
    return (req, res, next) => {
      if (req.user.role !== role) {
        return res.status(403).json({ message: 'Authorization failed: Insufficient role' });
      }
      next();
    };
  };
  

module.exports = {isAuthenticated, authorizedRole};