const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: "String",
      required: "true",
    },
    email: {
      type: "String",
      required: "true",
    },
    password: {
      type: "String",
      required: "true",
    },
  },
  { timestamps: true }
);

const UserModel = model("users", userSchema);
module.exports = { UserModel };
