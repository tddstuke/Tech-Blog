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

router.get("/:id", async (req, res) => {
  try {
    const data = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "post_content", "created_at"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    if (!data) {
      res.status(404).json({ message: "No post found with this id" });
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await Post.update(
      {
        title: req.body.title,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!data) {
      res.status(404).json({ message: "No post found with this id" });
    }
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
      user_id: req.session.user_id,
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      res.status(404).json({ message: "No post found with this id" });
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
