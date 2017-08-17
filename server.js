const express = require("express");
const mustache = require("mustache-express");
const session = require("express-session");
const bodyparser = require("body-parser");
const app = express();

const peeps = [
    { gamertag: "fancy", password: "pants" },
    { gamertag: "sandwich", password: "nocrust" },
    { gamertag: "hands", password: "feet" },
];
app.use(bodyparser.urlencoded({ extended: false }));
app.use(session({
    secret: "hgfhjt",
    resave: false,
    saveUninitialized: true
}));
app.engine("mustache", mustache());
app.set("views", "./views");
app.set("view engine", "mustache");

app.get("/", function (req, res) {
    res.render("login");
});

app.post("/login", function (req, res) {
    let peep = null;
    const gamertag = req.body.gamertag;
    const password = req.body.password;

    for (let i = 0; i < peeps.length; i++) {
        if (gamertag === peeps[i].gamertag
            && password === peeps[i].password) {
            peep = peeps[i];
        }
    }
    if (peep !== null) {
        req.session.tag = peep;
        res.redirect("/home");
    } else {
        res.redirect("/");
    }
});

app.get("/home", function (req, res) {
    res.render("home", {gamertag: req.session.tag.gamertag });
});




app.listen(3000, function () {
    console.log("Ready Player One!")
});