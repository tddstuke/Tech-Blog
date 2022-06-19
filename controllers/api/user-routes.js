const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

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
    req.session.save(() => {
      req.session.user_id = data.id;
      req.session.username = data.username;
      req.session.loggedIn = true;

      res.json(data);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    // expects {email: , password }
    const data = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!data) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }
    const validPassword = data.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
    }
    req.session.save(() => {
      console.log(data.id, data.username);
      // declare session variables
      req.session.user_id = data.id;
      req.session.username = data.username;
      req.session.loggedIn = true;

      res.json({ user: data, message: "You are now logged in!" });
      console.log(req.session);
    });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  // expects {username: , email: , password: }

  // if req.body has exact key/value pairs to match the model, you can just use `req.body instead
  try {
    const data = await User.update(req.body, {
      individualHooks: true,
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

router.delete("/:id", withAuth, async (req, res) => {
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

router.post("/logout", withAuth, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
