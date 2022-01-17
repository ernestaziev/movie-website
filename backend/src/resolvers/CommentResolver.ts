import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql"
import Comment from "../entity/Comment"
import User from "../entity/User"
import { isAuth } from "../utils/isAuth"
import { MyContext } from "./UserResolver"
import Movie from "../entity/Movie"
import { UserInputError } from "apollo-server-errors"

@Resolver()
export class CommentResolver {
  @Query(() => [Comment], { nullable: true })
  async getComments(
    @Arg("movieId") movieId: number,
    @Arg("orderBy", { defaultValue: "DESC" }) orderBy: string
  ) {
    try {
      return await Comment.find({
        relations: ["movie", "user"],
        where: {
          movie: {
            imdb_id: movieId,
          },
        },
        order: {
          created_at: orderBy === "DESC" ? "DESC" : "ASC",
        },
      })
    } catch (error) {
      return null
    }
  }

  @Mutation(() => Comment)
  @UseMiddleware(isAuth)
  async addComment(
    @Arg("text") text: string,
    @Arg("movieId") movieId: number,
    @Ctx() ctx: MyContext
  ) {
    try {
      if (!text.trim()) {
        throw new UserInputError("The comment cannot be empty")
      }
      const movie = await Movie.findOne(movieId)

      if (!movie) {
        throw new UserInputError("Movie not found :(")
      }

      const user = await User.findOne(ctx.tokenPayload?.userId)
      const newComment = new Comment()
      newComment.text = text
      newComment.movie = movie
      newComment.user = user!
      await newComment.save()
      return newComment
    } catch (error) {
      throw error
    }
  }

  @Mutation(() => Comment)
  @UseMiddleware(isAuth)
  async updateComment(
    @Arg("text") text: string,
    @Arg("commentId") commentId: number,
    @Ctx() ctx: MyContext
  ) {
    try {
      if (!text.trim()) {
        throw new UserInputError("The comment cannot be empty")
      }

      const comment = await Comment.findOne(commentId, {
        where: { user: Number(ctx.tokenPayload?.userId) },
        relations: ["user", "movie"],
      })

      if (!comment) {
        throw new UserInputError("Comment not found :(")
      }

      comment.text = text
      await comment.save()
      return comment
    } catch (error) {
      throw error
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteComment(
    @Arg("commentId") commentId: number,
    @Ctx() ctx: MyContext
  ) {
    try {
      const comment = await Comment.findOne(commentId, {
        where: { user: Number(ctx.tokenPayload?.userId) },
        relations: ["user", "movie"],
      })

      if (!comment) {
        throw new UserInputError("Comment not found :(")
      }

      await comment.remove()
      return true
    } catch (error) {
      throw error
    }
  }
}
