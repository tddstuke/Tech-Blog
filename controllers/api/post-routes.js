const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Comment } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const data = await Post.findAll({
      order: [["created_at", "DESC"]],
      attributes: ["id", "title", "user_id", "created_at"],
      include: { model: User, attributes: ["username"] },
    });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await Post.create({
      title: req.body.title,
      post_content: req.body.post_content,
      user_id: req.body.user_id,
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
