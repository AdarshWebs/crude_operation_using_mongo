const axios = require("axios");
const API_BASE_URL = "https://crude-operation-using-mongo.onrender.com"; 

exports.homeRoutes = (req, res) => {
    axios.get(`${API_BASE_URL}/api/users`)
        .then(response => {
            res.render("index", { users: response.data });
        })
        .catch(err => {
            res.send(err);
        });
};

exports.add_user = (req, res) => {
    res.render("add_user");
};

exports.update_user = (req, res) => {
    axios.get(`${API_BASE_URL}/api/users`, { params: { id: req.query.id } })
        .then(userdata => {
            res.render("update_user", { user: userdata.data }); // Pass user data
        })
        .catch(err => {
            res.send(err);
        });
};
