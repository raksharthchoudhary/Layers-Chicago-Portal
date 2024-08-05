module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  };  