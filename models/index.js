const User = require("./User");
const Post = require("./Post");

User.hasMany(Post, {
  foreignKey: "user-id",
  onDelete: "SET NULL",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Post };
