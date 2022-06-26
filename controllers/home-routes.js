const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

// render all for homepage
router.get("/", async (req, res) => {
  try {
    const data = Post.findAll({
      attributes: ["id", "title", "post_content", "created_at"],
      include: { model: User, attributes: ["username"] },
    });
    const posts = (await data).map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render("homepage", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// single page click
router.get("/single-post/:id", async (req, res) => {
  try {
    const data = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "post_content", "title", "created_at"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "created_at"],
          include: { model: User, attributes: ["username"] },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    if (!data) {
      res.status(404).json({ message: "no post found with this id" });
      return;
    }
    // serialize data
    const post = data.get({ plain: true });

    // pass to template
    res.render("single-post", { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

// login click
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
