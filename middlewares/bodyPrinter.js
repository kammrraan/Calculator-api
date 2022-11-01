const bodyPrinnter = (req, res, next) => {
  console.log(req.headers.host);
  console.log(req.body);
  next();
};

module.exports = bodyPrinnter;
