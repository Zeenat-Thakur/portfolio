const express = require('express');
const router = express.Router();
const Business = require("../db/business_model");
const {check, validationResult} = require("express-validator/check");

/* GET home page. */
router.get('/view/:id', function (req, res, next) {
    Business.findById(req.params.id)
        .then((business) => {
            if (!business) {
                return res.status(404).send({
                    message: "Contact not found with id " + req.params.id,
                });
            }
            res.render('edit_business_contact_form', {title: 'Express', contact: business});
            // res.status(200).send(business);
            console.log(business);
        })
        .catch((err) => {
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.id,
            });
        });
});
router.post(
    "/create",
    [
        check("username", "Please Enter a Valid Username")
            .not()
            .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("phone", "Please enter a valid password").isLength({
            min: 10
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            username,
            email,
            phone
        } = req.body;
        try {
            let contact = await Business.findOne({
                email
            });
            if (contact) {
                return res.status(400).json({
                    msg: "Contact Already Exists"
                });
            }

            contact = new Business({
                username,
                email,
                phone
            });

            await contact.save();
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);
router.get("/:id", async (req, res) => {
    Business.findById(req.params.id)
        .then((business) => {
            if (!business) {
                return res.status(404).send({
                    message: "Contact not found with id " + req.params.id,
                });
            }
            res.status(200).send(business);
            console.log(business);
        })
        .catch((err) => {
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.id,
            });
        });
});
router.put("/update/:id", async (req, res) => {
    console.log(JSON.stringify(req.body))
    if (!req.body.email || !req.body.phone || !req.body.username) {
        res.status(400).send({
            message: "required fields cannot be empty",
        });
    }
    Business.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then((business) => {
            if (!business) {
                return res.status(404).send({
                    message: "no Contact found",
                });
            }
            res.status(200).send(business);
        })
        .catch((err) => {
            return res.status(404).send({
                message: "error while updating the contact",
            });
        });
});
router.delete("/delete/:id", async (req, res) => {
    Business.findByIdAndRemove(req.params.id)
        .then((business) => {
            if (!business) {
                return res.status(404).send({
                    message: "Business Contact not found ",
                });
            }
            res.send({message: "Business Contact deleted successfully!"});
        })
        .catch((err) => {
            return res.status(500).send({
                message: "Could not delete business contact ",
            });
        });
})

module.exports = router;