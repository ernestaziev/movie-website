import "reflect-metadata"
import { createConnection } from "typeorm"
import express from "express"
import cors from "cors"
import { JWT_COOKIE, PORT, REFRESH_TOKEN_SECRET } from "./constants"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { MyContext, UserResolver } from "./resolvers/UserResolver"
import { verify } from "jsonwebtoken"
import User from "./entity/User"
import {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
} from "./utils/generateToken"
import cookieParser from "cookie-parser"
import { CommentResolver } from "./resolvers/CommentResolver"
import Comment from "./entity/Comment"
import Movie from "./entity/Movie"
import { insertMovies, insertUsers, insertComments } from "./initialData"
import { MovieResolver } from "./resolvers/MovieResolver"

createConnection({
  type: "sqlite",
  database: "database.sqlite",
  dropSchema: true, //don't use this in production - otherwise you can lose production data.
  entities: [User, Comment, Movie],
  synchronize: true, //don't use this in production - otherwise you can lose production data.
})
  .then(async (connection) => {
    const app = express()

    app.use(
      cors({
        //The link for apollo studio was included only for demonstration purposes.
        //Don't include this link in production - otherwise you risk your production data.
        origin: ["http://localhost:8080", "https://studio.apollographql.com"],
        credentials: true,
      })
    )
    app.use(cookieParser())

    app.post("/refresh-token", async (req, res) => {
      const token = req.cookies[JWT_COOKIE]
      if (!token) {
        return res.send({ success: false, access_token: "" })
      }

      let data: any = null
      try {
        data = verify(token, REFRESH_TOKEN_SECRET)
      } catch (error) {
        console.error(error)
        return res.send({ success: false, access_token: "" })
      }

      const user = await User.findOne(data.userId)
      if (!user) {
        return res.send({ success: false, access_token: "" })
      }

      if (user.token_version !== data.tokenVersion) {
        return res.send({ success: false, access_token: "" })
      }

      const access_token = generateAccessToken(user)
      sendRefreshToken(res, generateRefreshToken(user))

      return res.send({ success: true, access_token })
    })

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [MovieResolver, UserResolver, CommentResolver],
      }),
      context: ({ req, res }): MyContext => ({ req, res }),
    })

    await apolloServer.start()

    apolloServer.applyMiddleware({ app, cors: false })

    app.listen(PORT, () =>
      //This "connection.query..." is only for demonstration purposes.
      //Don't use this queries like below in production - otherwise you can lose production data.
      connection
        .query(insertMovies)
        .then(() => {
          connection.query(insertUsers)
        })
        .then(() => {
          connection.query(insertComments)
        })
        .then(() => {
          console.log(`Server started on http://localhost:${PORT}/graphql`)
        })
    )
  })
  .catch((error) => console.log(error))
