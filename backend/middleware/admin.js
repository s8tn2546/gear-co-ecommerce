module.exports = function (req, res, next) {
  // auth middleware must be called before this
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ msg: 'Access denied: Admins only' });
  }
};
