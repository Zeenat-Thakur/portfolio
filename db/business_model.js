const mongoose = require("mongoose");
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
        phone: {
            desc: "user Contact",
            trim: true,
            type: String,
            required: true,
            select: true,
        },
        username: {
            desc: "The user's name.",
            trim: true,
            type: String,
            required: true,
        }
    },
    {
        strict: true,
        versionKey: false,
        timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"},
    }
);

module.exports = mongoose.model("Business", schema);