const jwt = require("jsonwebtoken");

module.exports = function (roles = []) {
  return (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ msg: "No token provided" });

    try {
      const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ msg: "Access denied" });
      }
      next();
    } catch (err) {
      return res.status(401).json({ msg: "Invalid token" });
    }
  };
};
