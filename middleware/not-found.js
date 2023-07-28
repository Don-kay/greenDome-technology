const notFound = (req, res) =>
  res.status(404).send("Sorry, Route doesn't exist");

module.exports = notFound;
