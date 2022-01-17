import "dotenv/config"
export const PORT = process.env.PORT!
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!
export const JWT_COOKIE = "movie-jwt"

export const PATTERNS = {
  firstName: /^[A-Za-z0-9]{2,16}$/,
  lastName: /^[A-Za-z0-9]{2,16}$/,
  email: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
  password:
    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
}
