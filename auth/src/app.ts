import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, xss, currentUser } from "@yarapay/tools";
import { authRouter } from "./routes/authRoutes";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(morgan("combined"));
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(mongoSanitize());
app.use(xss());

app.use(authRouter);
app.use(currentUser);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
