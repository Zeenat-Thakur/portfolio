const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const schema = new mongoose.Schema(
    {
        email: {
            desc: "The user's email address.",
            trim: true,
            type: String,
            index: true,
            unique: true,
            required: true,
        },
        password: {
            desc: "user password",
            trim: true,
            type: String,
            select: true,
        },
        username: {
            desc: "The user's name.",
            trim: true,
            type: String,
            required: true,
        },
    },
    {
        strict: true,
        versionKey: false,
        timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"},
    }
);
schema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Users", schema);