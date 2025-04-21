import Todo from "../models/Todo.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

const getUserSpecificTodos = async (req, res) => {
  const userId = req.user._id;
  try {
    const todos = await Todo.find({ userId });
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching todos" });
  }
};

const postTodo_userSpecific = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user._id; // Assuming the user ID is attached to req.user (via authentication middleware)

  // Create a new Todo object
  const newTodo = new Todo({
    userId,
    title,
    description,
  });

  try {
    // Save the Todo to the database
    const savedTodo = await Todo.create(newTodo);

    if (!savedTodo) {
      return res.status(400).json({ message: "Todo creation failed" });
    }

    // Send an email notification if the Todo is pending (not completed)
    if (!savedTodo.completed) {
      await sendPendingTodoEmail(req.user.email, savedTodo);
    }

    return res.json({
      message: "Todo created successfully",
      todo: savedTodo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error occurred" });
  }
};

// Nodemailer configuration
const sendPendingTodoEmail = async (userEmail, todo) => {
  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can change this to use any email service provider you prefer
    auth: {
      user: "shivanshkumar760@gmail.com", // Replace with your email
      pass: "anita@653", // Replace with your email password (use environment variables for security)
    },
  });

  // Email options
  const mailOptions = {
    from: "shivanshkumar760@gmail.com", // Replace with your email
    to: userEmail, // The email of the user (from req.user)
    subject: "Pending Todo Created",
    text: `Hello, You have a new pending todo created:\n\nTitle: ${todo.title}\nDescription: ${todo.description}\n\nPlease remember to complete it soon!`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Pending todo email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export { getUserSpecificTodos, postTodo_userSpecific };
