const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:5173",  // Ensure this matches the frontend origin
    },
  });
  
  let users = [];
  
  const addUser = (userId, socketId) => {
    // Avoid adding duplicate users
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  
  io.on("connection", (socket) => {
    console.log("a user connected.");
  
    // Add user to the list
    socket.on("addUser", (userId) => {
        console.log("User added");
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  
    // Send and receive messages
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      // Get the receiver user
      console.log(receiverId);
      const user = getUser(receiverId);
        console.log("Message sent");
      // Ensure the user exists before sending the message
      if (user) {
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
        });
      } else {
        console.log("User not found or not connected:", receiverId);
      }
    });
  
    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
  