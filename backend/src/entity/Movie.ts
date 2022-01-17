import { Field, Float, Int, ObjectType } from "type-graphql"
import { Entity, Column, BaseEntity, OneToMany, PrimaryColumn } from "typeorm"
import Comment from "./Comment"

@ObjectType()
@Entity()
export default class Movie extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  imdb_id: number

  @Field(() => String)
  @Column("nchar")
  title: string

  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  plot: string

  @Field(() => String)
  @Column()
  genres: string

  @Field(() => Int)
  @Column("smallint")
  runtime: number

  @Field(() => Int)
  @Column("smallint")
  year: number

  @Field(() => String, { nullable: true })
  @Column({ type: "character", nullable: true })
  rated: string

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  cast: string

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  poster: string

  @Field(() => String)
  @Column()
  countries: string

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  directors: string

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  writers: string

  @Field(() => Int)
  @Column("tinyint")
  awards_wins: number

  @Field(() => Int)
  @Column("tinyint")
  awards_nominations: number

  @Field(() => Float)
  @Column("decimal")
  imdb_rating: number

  @Field(() => Int)
  @Column()
  imdb_votes: number

  @Field(() => String)
  @Column("nchar")
  type: string

  @Field(() => Float, { nullable: true })
  @Column({ type: "decimal", nullable: true })
  tomatoes_viewer_rating: number

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  tomatoes_viewer_numReviews: number

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  tomatoes_viewer_meter: number

  @Field(() => Float, { nullable: true })
  @Column({ type: "decimal", nullable: true })
  tomatoes_critic_rating: number

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  tomatoes_critic_numReviews: number

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  tomatoes_critic_meter: number

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  tomatoes_production: string

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  tomatoes_fresh: number

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  languages: string

  @OneToMany(() => Comment, (comment) => comment.movie)
  comments?: Comment[]
}
