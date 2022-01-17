import { Field, Int, ObjectType } from "type-graphql"
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm"
import Comment from "./Comment"

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => String)
  @Column()
  email: string

  @Field(() => String)
  @Column()
  first_name: string

  @Field(() => String)
  @Column()
  last_name: string

  @Column()
  password: string

  @Field(() => Int)
  @Column("int", { default: 0 })
  token_version: number

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[]
}
