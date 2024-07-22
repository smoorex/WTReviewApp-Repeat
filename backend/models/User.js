const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  category: {
    type: String,
    enum: ["movies", "books", "shows"],
    required: true,
  },
  itemId: { type: Number, required: true },
});

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  favorites: { type: [FavoriteSchema], required: false },
});

module.exports = mongoose.model("User", UserSchema);
