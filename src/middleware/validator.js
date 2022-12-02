//validator module

module.exports = (req, res, next) => {
  if (req.query.name) {
    next();
  } else {
    next(`Not Found`);
  }
};
