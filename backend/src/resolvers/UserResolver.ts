import { UserInputError } from "apollo-server-express"
import { compare, hash } from "bcryptjs"
import { Request, Response } from "express"
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql"
import { getConnection } from "typeorm"
import { JWT_COOKIE, PATTERNS } from "../constants"
import User from "../entity/User"
import {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
} from "../utils/generateToken"
import { isAuth } from "../utils/isAuth"

export interface MyContext {
  res: Response
  req: Request
  tokenPayload?: {
    userId: string
    tokenVersion?: number
  }
}

@ObjectType()
class SigninResponse {
  @Field(() => String)
  access_token: string
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() ctx: MyContext) {
    const payload = ctx.tokenPayload

    if (!payload) return null

    try {
      const user = await User.findOne(payload.userId)
      return user
    } catch (error) {
      console.error(error)
      return null
    }
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string
  ) {
    try {
      const findUser = await User.findOne({ where: { email } })
      if (findUser) {
        throw new UserInputError("User with that email is already exist")
      }

      const areValid = [
        PATTERNS.firstName.test(firstName),
        PATTERNS.lastName.test(lastName),
        PATTERNS.email.test(email),
        PATTERNS.password.test(password),
      ]

      for (const isValid of areValid) {
        if (!isValid) throw new UserInputError("invalid values")
      }

      await User.insert({
        email: email.toLowerCase(),
        password: await hash(password, 12),
        first_name: firstName,
        last_name: lastName,
      })

      return true
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  @Mutation(() => SigninResponse)
  async signIn(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ) {
    try {
      const user = await User.findOne({ where: { email: email.toLowerCase() } })

      if (!user) {
        throw new UserInputError("User with that email is doesn't exist")
      }

      const isPasswordValid = await compare(password, user.password)

      if (!isPasswordValid) {
        throw new UserInputError("Password is invalid")
      }

      const accessToken = generateAccessToken(user)
      const refreshToken = generateRefreshToken(user)

      sendRefreshToken(res, refreshToken)

      return {
        access_token: accessToken,
      }
    } catch (error) {
      throw error
    }
  }

  @Mutation(() => Boolean)
  async revokeUserSession(@Arg("userId") userId: number) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId! }, "token_version", 1)
    return true
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext) {
    ctx.res.clearCookie(JWT_COOKIE)
    return true
  }
}
