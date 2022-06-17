const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

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

router.get("/:id", async (req, res) => {
  try {
    const data = await User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        { model: Post },
        { model: Comment, attributes: ["id", "comment_text", "created_at"] },
      ],
    });
    if (!data) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }

    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!data) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
