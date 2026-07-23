const express = require("express");
const path = require("path");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Home Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Login Route
app.post("/login", (req, res) => {

    const { user, pass } = req.body;

    console.log("Username:", user);
    console.log("Password:", pass);

    if (user === "admin" && pass === "1234") {
        res.redirect("/home.html");
    } else {
        res.send(`
            <h1>❌ Invalid Username or Password</h1>
            <a href="/">Go Back</a>
        `);
    }
});

// Order Route
app.post("/order", (req, res) => {

    console.log("Order Received");
    console.log(req.body);

    res.redirect("/success.html");
});

// 404
app.use((req, res) => {
    res.status(404).send("<h1>404 - Page Not Found</h1>");
});

// Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running at http://localhost:${PORT}`);
});