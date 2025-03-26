var Userdb = require('../model/model');

// Create and save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    // New user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    // Save user in the database
    user
        .save()
        .then(data => {
            //res.send(data);
            res.redirect("/add-user")
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a user."
            });
        });
};

// Retrieve and return all users or a single user

// Logic to retrieve users will be added here
exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;

        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "User not found with the given ID" });
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving user information" });
            });
    } else {
        Userdb.find()
            .then(users => {
                res.send(users);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error occurred retrieving user information" });
            });
    }
};


// Update an identified user by user ID
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data is not found" });
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { new: true })  // 'new: true' returns the updated document
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update the user ${id}. Maybe user not found.` });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating user information" });
        });
};


// Delete a user with the specified user ID in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete user with id ${id}` });
            } else {
                res.send({ message: "User successfully deleted!" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Could not delete the user with id ${id}` });
        });
};

