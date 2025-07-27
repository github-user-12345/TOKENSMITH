const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const SECRET = "supersecuresecret";

// Mock database
const users = [
  { username: "admin", password: bcrypt.hashSync("admin123", 8), role: "admin" },
  { username: "user", password: bcrypt.hashSync("user123", 8), role: "user" }
];

// Login endpoint (Authentication)
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ username: user.username, role: user.role }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Protected endpoint (Authorization)
app.get("/protected", verifyToken, (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
  res.json({ message: "Welcome Admin! Secure content here." });
});

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "No token provided" });
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.user = decoded;
    next();
  });
}

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
