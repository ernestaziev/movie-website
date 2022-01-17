import { AuthenticationError } from "apollo-server-errors"
import { verify } from "jsonwebtoken"
import { MiddlewareFn } from "type-graphql"
import { ACCESS_TOKEN_SECRET } from "../constants"
import { MyContext } from "../resolvers/UserResolver"

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const bearer = context.req.headers["authorization"]

  if (!bearer) {
    throw new AuthenticationError("Not authenticated")
  }

  const token = bearer!.split(" ")[1]

  try {
    const tokenPayload = verify(token, ACCESS_TOKEN_SECRET)
    context.tokenPayload = tokenPayload as any
  } catch (error) {
    console.error(error)
    throw new AuthenticationError("Not authenticated")
  }
  return next()
}
