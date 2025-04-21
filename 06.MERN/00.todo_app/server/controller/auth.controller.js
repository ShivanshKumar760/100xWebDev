import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  const addingUser = await User.create(newUser);
  if (!addingUser) {
    return res.status(400).json({ message: "User registration failed" });
  }
  const token = jwt.sign({ id: addingUser._id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  res.cookie("token", token, {
    httpOnly: true, // The cookie cannot be accessed through JavaScript (mitigates XSS attacks
    maxAge: 2 * 60 * 60 * 1000, // Expiry of the cookie (same as the JWT expiration)
    sameSite: "Strict", // CSRF protection
  });

  return res.status(201).json({
    message: "User registered successfully",
    user: {
      id: addingUser._id,
      name: addingUser.name,
      email: addingUser.email,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser) {
    const isMatch = await bcrypt.compareSync(password, findUser.password);
    if (isMatch) {
      const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      res.cookie("token", token, {
        httpOnly: true, // The cookie cannot be accessed through JavaScript (mitigates XSS attacks
        maxAge: 2 * 60 * 60 * 1000, // Expiry of the cookie (same as the JWT expiration)
        sameSite: "Strict", // CSRF protection
      });
      return res.status(200).json({
        message: "Login successful",
        user: {
          id: findUser._id,
          name: findUser.name,
          email: findUser.email,
        },
        token,
      });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};

export { register, login };
