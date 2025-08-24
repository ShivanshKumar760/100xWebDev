import { Router } from "express";

const route = Router();

route.get("/", (req, res) => {
  res.send("Welcome to the API");
});

route.post("/user/signup", (req, res) => {
  // Handle user signup logic here
  res.send("User signup endpoint");
});

route.post("/user/singin", (req, res) => {
  // Handle user login logic here
  res.send("User login endpoint");
});

route.get("/user/purchases", (req, res) => {
  // Handle fetching user profile logic here
  res.send("User course  profile endpoint");
});

route.get("/course/preview", (req, res) => {
  // Handle fetching all courses logic here
  res.send("All courses endpoint");
});

route.post("/course/purchase", (req, res) => {
  // Handle course purchase logic here
  res.send("Course purchase endpoint");
});
