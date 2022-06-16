const router = require("express").Router();
const User = require("../../models");

// get all users GET/api/users
router.get("/", async (req, res) => {
  try {
    const data = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(data);
    req.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
