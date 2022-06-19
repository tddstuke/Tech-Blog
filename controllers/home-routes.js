const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    const data = Post.findAll({
      attributes: ["id", "title", "post_content", "created_at"],
      include: { model: User, attributes: ["username"] },
    });
    const posts = (await data).map((post) => post.get({ plain: true }));
    res.render("homepage", { posts });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
