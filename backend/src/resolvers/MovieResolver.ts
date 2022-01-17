import { Arg, Args, ArgsType, Field, Int, Query, Resolver } from "type-graphql"
import { Min, Max } from "class-validator"
import Movie from "../entity/Movie"
import { ILike } from "typeorm"

@ArgsType()
class GetMoviesArgs {
  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  offset: number

  @Field(() => Int)
  @Min(1)
  @Max(30)
  limit = 15

  @Field(() => String, { defaultValue: "" })
  title?: string
}

@Resolver()
export class MovieResolver {
  @Query(() => [Movie])
  async getMovies(@Args() { title, limit, offset }: GetMoviesArgs) {
    try {
      return await Movie.find({
        where: { title: ILike(`%${title}%`) },
        order: { tomatoes_critic_numReviews: "DESC" },
        skip: offset,
        take: limit,
      })
    } catch (error) {
      throw error
    }
  }

  @Query(() => Movie)
  async getMovie(@Arg("movieId") movieId: number) {
    try {
      return await Movie.findOne(movieId)
    } catch (error) {
      throw error
    }
  }
}
