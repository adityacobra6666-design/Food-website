const express = require("express");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// Login
app.post("/login", (req, res) => {

    const { user, pass } = req.body;

    if (user === "admin" && pass === "1234") {
        res.redirect("/home.html");
    } else {
        res.send(`
            <h1>❌ Invalid Username or Password</h1>
            <a href="/login.html">Go Back</a>
        `);
    }

});

// Order API
app.post("/order", (req, res) => {

    const { item, price } = req.body;

    console.log("========== NEW ORDER ==========");
    console.log("Food :", item);
    console.log("Price :", price);
    console.log("===============================");

    res.redirect("/success.html");

});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running at http://localhost:${PORT}`);
});