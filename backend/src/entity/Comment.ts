import { Field, Int, ObjectType } from "type-graphql"
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import Movie from "./Movie"
import User from "./User"

@ObjectType()
@Entity()
export default class Comment extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => String)
  @Column("text")
  text: string

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comments, { onDelete: "SET NULL" })
  user: User

  @Field(() => Movie)
  @ManyToOne(() => Movie, (movie) => movie.comments, {
    onDelete: "CASCADE",
  })
  movie: Movie

  @Field(() => Date)
  @CreateDateColumn()
  created_at: Date

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date
}
