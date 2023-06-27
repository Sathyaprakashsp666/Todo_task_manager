const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/users.model");

// User registration
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);

    // Check if the username is already taken or not
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "User not exist!" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generating a JWT token
    const token = jwt.sign({ userId: user._id }, "secretKey");

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    let users = await User.find();

    res.send(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};
