import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import cors from "cors";

// Graphql
import schema from "./graphql/schema";

// Models
import User from "./models/User";

// Services
import { getAccessToken, getRefreshToken } from "./services/auth";

const startServer = async () => {
  try {
    // Remove Deprecation Warning.
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    //
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-3yzwb.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(">> Database connection succed");

    const server = new ApolloServer({
      schema: schema,
      context: ({ req, res }) => ({ req, res }),
    });

    const app = express();

    const corsOptions = {
      origin: "http://localhost:3000",
      credentials: true,
    };
    app.use(cors(corsOptions));

    app.use(cookieParser());

    app.use(async (req, res, next) => {
      const accessToken = req.cookies["access-token"];
      const refreshToken = req.cookies["refresh-token"];
      if (!refreshToken && !accessToken) {
        return next();
      }
      try {
        const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.userId = data.id;
        return next();
      } catch (err) {}

      if (!refreshToken) return next();

      let data;
      try {
        data = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      } catch (err) {
        return next();
      }

      const user = await User.findById(data.id);
      // Token has been invalidated
      if (!user || user.count != data.count) {
        return next();
      }

      const newRefreshToken = getRefreshToken(user);
      const newAccessToken = getAccessToken(user);

      res.cookie("refresh-token", newRefreshToken, {
        expire: 60 * 60 * 24 * 7,
      });
      res.cookie("access-token", newAccessToken, { expire: 60 * 15 });
      req.userId = user.id;

      next();
    });

    server.applyMiddleware({ app, cors: false });

    app.listen({ port: 4000 }, () => {
      console.log(
        `>> GraphQL server running 🚀 at http://localhost:4000${server.graphqlPath}`
      );
    });
  } catch (err) {
    throw err;
  }
};

startServer();
