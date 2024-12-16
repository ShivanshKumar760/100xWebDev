import dotenv from "dotenv";
import "express-async-errors";
import express from "express";
import notFound from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
//importing server connection file:
import startServer from "./start/startServer.js";
//importing mongoose instance
import mongooseInstance from "./db/mongoose.db.js";
//importing route:
import router from "./routes/main.routes.js";
dotenv.config();
const app = express();

// middleware
app.use(express.static('./public'));
app.use(express.json());
app.use('/api/v1',router);

app.use(notFound);
app.use(errorHandlerMiddleware);



startServer(mongooseInstance,app);

