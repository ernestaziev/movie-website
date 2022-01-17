import { Response } from "express"
import { sign } from "jsonwebtoken"
import {
  ACCESS_TOKEN_SECRET,
  JWT_COOKIE,
  REFRESH_TOKEN_SECRET,
} from "../constants"
import User from "../entity/User"

export const generateAccessToken = (user: User) => {
  return sign(
    {
      userId: user.id,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  )
}

export const generateRefreshToken = (user: User) => {
  return sign(
    {
      userId: user.id,
      tokenVersion: user.token_version,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  )
}

export const sendRefreshToken = (res: Response, refreshToken: string) => {
  res.cookie(JWT_COOKIE, refreshToken, {
    httpOnly: true,
  })
}
