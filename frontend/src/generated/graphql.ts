import gql from "graphql-tag"
import * as VueApolloComposable from "@vue/apollo-composable"
import * as VueCompositionApi from "vue"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type ReactiveFunction<TParam> = () => TParam
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
}

export type Comment = {
  __typename?: "Comment"
  created_at: Scalars["DateTime"]
  id: Scalars["Int"]
  movie: Movie
  text: Scalars["String"]
  updated_at: Scalars["DateTime"]
  user: User
}

export type Movie = {
  __typename?: "Movie"
  awards_nominations: Scalars["Int"]
  awards_wins: Scalars["Int"]
  cast?: Maybe<Scalars["String"]>
  countries: Scalars["String"]
  directors?: Maybe<Scalars["String"]>
  genres: Scalars["String"]
  imdb_id: Scalars["Int"]
  imdb_rating: Scalars["Float"]
  imdb_votes: Scalars["Int"]
  languages?: Maybe<Scalars["String"]>
  plot?: Maybe<Scalars["String"]>
  poster?: Maybe<Scalars["String"]>
  rated?: Maybe<Scalars["String"]>
  runtime: Scalars["Int"]
  title: Scalars["String"]
  tomatoes_critic_meter?: Maybe<Scalars["Int"]>
  tomatoes_critic_numReviews?: Maybe<Scalars["Int"]>
  tomatoes_critic_rating?: Maybe<Scalars["Float"]>
  tomatoes_fresh?: Maybe<Scalars["Int"]>
  tomatoes_production?: Maybe<Scalars["String"]>
  tomatoes_viewer_meter?: Maybe<Scalars["Int"]>
  tomatoes_viewer_numReviews?: Maybe<Scalars["String"]>
  tomatoes_viewer_rating?: Maybe<Scalars["Float"]>
  type: Scalars["String"]
  writers?: Maybe<Scalars["String"]>
  year: Scalars["Int"]
}

export type Mutation = {
  __typename?: "Mutation"
  addComment: Comment
  deleteComment: Scalars["Boolean"]
  logout: Scalars["Boolean"]
  register: Scalars["Boolean"]
  revokeUserSession: Scalars["Boolean"]
  signIn: SigninResponse
  updateComment: Comment
}

export type MutationAddCommentArgs = {
  movieId: Scalars["Float"]
  text: Scalars["String"]
}

export type MutationDeleteCommentArgs = {
  commentId: Scalars["Float"]
}

export type MutationRegisterArgs = {
  email: Scalars["String"]
  firstName: Scalars["String"]
  lastName: Scalars["String"]
  password: Scalars["String"]
}

export type MutationRevokeUserSessionArgs = {
  userId: Scalars["Float"]
}

export type MutationSignInArgs = {
  email: Scalars["String"]
  password: Scalars["String"]
}

export type MutationUpdateCommentArgs = {
  commentId: Scalars["Float"]
  text: Scalars["String"]
}

export type Query = {
  __typename?: "Query"
  getComments?: Maybe<Array<Comment>>
  getMovie: Movie
  getMovies: Array<Movie>
  me?: Maybe<User>
}

export type QueryGetCommentsArgs = {
  movieId: Scalars["Float"]
  orderBy?: InputMaybe<Scalars["String"]>
}

export type QueryGetMovieArgs = {
  movieId: Scalars["Float"]
}

export type QueryGetMoviesArgs = {
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  title?: InputMaybe<Scalars["String"]>
}

export type SigninResponse = {
  __typename?: "SigninResponse"
  access_token: Scalars["String"]
}

export type User = {
  __typename?: "User"
  email: Scalars["String"]
  first_name: Scalars["String"]
  id: Scalars["Int"]
  last_name: Scalars["String"]
  token_version: Scalars["Int"]
}

export type AddCommentMutationVariables = Exact<{
  movieId: Scalars["Float"]
  text: Scalars["String"]
}>

export type AddCommentMutation = {
  __typename?: "Mutation"
  addComment: {
    __typename?: "Comment"
    id: number
    text: string
    user: {
      __typename?: "User"
      id: number
      first_name: string
      last_name: string
    }
    movie: { __typename?: "Movie"; imdb_id: number }
  }
}

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars["Float"]
}>

export type DeleteCommentMutation = {
  __typename?: "Mutation"
  deleteComment: boolean
}

export type GetCommentsQueryVariables = Exact<{
  movieId: Scalars["Float"]
}>

export type GetCommentsQuery = {
  __typename?: "Query"
  getComments?:
    | Array<{
        __typename?: "Comment"
        id: number
        text: string
        user: {
          __typename?: "User"
          id: number
          first_name: string
          last_name: string
        }
      }>
    | null
    | undefined
}

export type GetMoviePlotQueryVariables = Exact<{
  movieId: Scalars["Float"]
}>

export type GetMoviePlotQuery = {
  __typename?: "Query"
  getMovie: {
    __typename?: "Movie"
    imdb_id: number
    plot?: string | null | undefined
  }
}

export type GetMoviesQueryVariables = Exact<{
  offset?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  title?: InputMaybe<Scalars["String"]>
}>

export type GetMoviesQuery = {
  __typename?: "Query"
  getMovies: Array<{
    __typename?: "Movie"
    imdb_id: number
    title: string
    year: number
    runtime: number
    poster?: string | null | undefined
    imdb_rating: number
  }>
}

export type GetMoviesTitleQueryVariables = Exact<{
  offset?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  title?: InputMaybe<Scalars["String"]>
}>

export type GetMoviesTitleQuery = {
  __typename?: "Query"
  getMovies: Array<{ __typename?: "Movie"; imdb_id: number; title: string }>
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean }

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: "Query"
  me?:
    | {
        __typename?: "User"
        id: number
        email: string
        first_name: string
        last_name: string
        token_version: number
      }
    | null
    | undefined
}

export type MeFirstNameQueryVariables = Exact<{ [key: string]: never }>

export type MeFirstNameQuery = {
  __typename?: "Query"
  me?:
    | { __typename?: "User"; id: number; first_name: string }
    | null
    | undefined
}

export type MeUserIdQueryVariables = Exact<{ [key: string]: never }>

export type MeUserIdQuery = {
  __typename?: "Query"
  me?: { __typename?: "User"; id: number } | null | undefined
}

export type RegisterMutationVariables = Exact<{
  firstName: Scalars["String"]
  lastName: Scalars["String"]
  email: Scalars["String"]
  password: Scalars["String"]
}>

export type RegisterMutation = { __typename?: "Mutation"; register: boolean }

export type SignInMutationVariables = Exact<{
  password: Scalars["String"]
  email: Scalars["String"]
}>

export type SignInMutation = {
  __typename?: "Mutation"
  signIn: { __typename?: "SigninResponse"; access_token: string }
}

export type UpdateCommentMutationVariables = Exact<{
  commentId: Scalars["Float"]
  text: Scalars["String"]
}>

export type UpdateCommentMutation = {
  __typename?: "Mutation"
  updateComment: {
    __typename?: "Comment"
    id: number
    text: string
    user: {
      __typename?: "User"
      id: number
      first_name: string
      last_name: string
    }
  }
}

export const AddCommentDocument = gql`
  mutation AddComment($movieId: Float!, $text: String!) {
    addComment(movieId: $movieId, text: $text) {
      id
      text
      user {
        id
        first_name
        last_name
      }
      movie {
        imdb_id
      }
    }
  }
`

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useAddCommentMutation({
 *   variables: {
 *     movieId: // value for 'movieId'
 *     text: // value for 'text'
 *   },
 * });
 */
export function useAddCommentMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        AddCommentMutation,
        AddCommentMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          AddCommentMutation,
          AddCommentMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    AddCommentMutation,
    AddCommentMutationVariables
  >(AddCommentDocument, options)
}
export type AddCommentMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    AddCommentMutation,
    AddCommentMutationVariables
  >
export const DeleteCommentDocument = gql`
  mutation DeleteComment($commentId: Float!) {
    deleteComment(commentId: $commentId)
  }
`

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteCommentMutation({
 *   variables: {
 *     commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeleteCommentMutation,
        DeleteCommentMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeleteCommentMutation,
          DeleteCommentMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >(DeleteCommentDocument, options)
}
export type DeleteCommentMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >
export const GetCommentsDocument = gql`
  query GetComments($movieId: Float!) {
    getComments(movieId: $movieId) {
      id
      text
      user {
        id
        first_name
        last_name
      }
    }
  }
`

/**
 * __useGetCommentsQuery__
 *
 * To run a query within a Vue component, call `useGetCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetCommentsQuery({
 *   movieId: // value for 'movieId'
 * });
 */
export function useGetCommentsQuery(
  variables:
    | GetCommentsQueryVariables
    | VueCompositionApi.Ref<GetCommentsQueryVariables>
    | ReactiveFunction<GetCommentsQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        GetCommentsQuery,
        GetCommentsQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          GetCommentsQuery,
          GetCommentsQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          GetCommentsQuery,
          GetCommentsQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useQuery<
    GetCommentsQuery,
    GetCommentsQueryVariables
  >(GetCommentsDocument, variables, options)
}
export type GetCommentsQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<
    GetCommentsQuery,
    GetCommentsQueryVariables
  >
export const GetMoviePlotDocument = gql`
  query GetMoviePlot($movieId: Float!) {
    getMovie(movieId: $movieId) {
      imdb_id
      plot
    }
  }
`

/**
 * __useGetMoviePlotQuery__
 *
 * To run a query within a Vue component, call `useGetMoviePlotQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMoviePlotQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetMoviePlotQuery({
 *   movieId: // value for 'movieId'
 * });
 */
export function useGetMoviePlotQuery(
  variables:
    | GetMoviePlotQueryVariables
    | VueCompositionApi.Ref<GetMoviePlotQueryVariables>
    | ReactiveFunction<GetMoviePlotQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        GetMoviePlotQuery,
        GetMoviePlotQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          GetMoviePlotQuery,
          GetMoviePlotQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          GetMoviePlotQuery,
          GetMoviePlotQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useQuery<
    GetMoviePlotQuery,
    GetMoviePlotQueryVariables
  >(GetMoviePlotDocument, variables, options)
}
export type GetMoviePlotQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<
    GetMoviePlotQuery,
    GetMoviePlotQueryVariables
  >
export const GetMoviesDocument = gql`
  query GetMovies($offset: Int, $limit: Int, $title: String) {
    getMovies(offset: $offset, limit: $limit, title: $title) {
      imdb_id
      title
      year
      runtime
      poster
      imdb_rating
    }
  }
`

/**
 * __useGetMoviesQuery__
 *
 * To run a query within a Vue component, call `useGetMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMoviesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetMoviesQuery({
 *   offset: // value for 'offset'
 *   limit: // value for 'limit'
 *   title: // value for 'title'
 * });
 */
export function useGetMoviesQuery(
  variables:
    | GetMoviesQueryVariables
    | VueCompositionApi.Ref<GetMoviesQueryVariables>
    | ReactiveFunction<GetMoviesQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<
        GetMoviesQuery,
        GetMoviesQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          GetMoviesQuery,
          GetMoviesQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          GetMoviesQuery,
          GetMoviesQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useQuery<GetMoviesQuery, GetMoviesQueryVariables>(
    GetMoviesDocument,
    variables,
    options
  )
}
export type GetMoviesQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<GetMoviesQuery, GetMoviesQueryVariables>
export const GetMoviesTitleDocument = gql`
  query GetMoviesTitle($offset: Int, $limit: Int, $title: String) {
    getMovies(offset: $offset, limit: $limit, title: $title) {
      imdb_id
      title
    }
  }
`

/**
 * __useGetMoviesTitleQuery__
 *
 * To run a query within a Vue component, call `useGetMoviesTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMoviesTitleQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetMoviesTitleQuery({
 *   offset: // value for 'offset'
 *   limit: // value for 'limit'
 *   title: // value for 'title'
 * });
 */
export function useGetMoviesTitleQuery(
  variables:
    | GetMoviesTitleQueryVariables
    | VueCompositionApi.Ref<GetMoviesTitleQueryVariables>
    | ReactiveFunction<GetMoviesTitleQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<
        GetMoviesTitleQuery,
        GetMoviesTitleQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          GetMoviesTitleQuery,
          GetMoviesTitleQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          GetMoviesTitleQuery,
          GetMoviesTitleQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useQuery<
    GetMoviesTitleQuery,
    GetMoviesTitleQueryVariables
  >(GetMoviesTitleDocument, variables, options)
}
export type GetMoviesTitleQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<
    GetMoviesTitleQuery,
    GetMoviesTitleQueryVariables
  >
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLogoutMutation();
 */
export function useLogoutMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        LogoutMutation,
        LogoutMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          LogoutMutation,
          LogoutMutationVariables
        >
      > = {}
) {
  return VueApolloComposable.useMutation<
    LogoutMutation,
    LogoutMutationVariables
  >(LogoutDocument, options)
}
export type LogoutMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<LogoutMutation, LogoutMutationVariables>
export const MeDocument = gql`
  query Me {
    me {
      id
      email
      first_name
      last_name
      token_version
    }
  }
`

/**
 * __useMeQuery__
 *
 * To run a query within a Vue component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMeQuery();
 */
export function useMeQuery(
  options:
    | VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>
      > = {}
) {
  return VueApolloComposable.useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    {},
    options
  )
}
export type MeQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<MeQuery, MeQueryVariables>
export const MeFirstNameDocument = gql`
  query MeFirstName {
    me {
      id
      first_name
    }
  }
`

/**
 * __useMeFirstNameQuery__
 *
 * To run a query within a Vue component, call `useMeFirstNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeFirstNameQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMeFirstNameQuery();
 */
export function useMeFirstNameQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        MeFirstNameQuery,
        MeFirstNameQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          MeFirstNameQuery,
          MeFirstNameQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          MeFirstNameQuery,
          MeFirstNameQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useQuery<
    MeFirstNameQuery,
    MeFirstNameQueryVariables
  >(MeFirstNameDocument, {}, options)
}
export type MeFirstNameQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<
    MeFirstNameQuery,
    MeFirstNameQueryVariables
  >
export const MeUserIdDocument = gql`
  query MeUserId {
    me {
      id
    }
  }
`

/**
 * __useMeUserIdQuery__
 *
 * To run a query within a Vue component, call `useMeUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeUserIdQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMeUserIdQuery();
 */
export function useMeUserIdQuery(
  options:
    | VueApolloComposable.UseQueryOptions<MeUserIdQuery, MeUserIdQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          MeUserIdQuery,
          MeUserIdQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          MeUserIdQuery,
          MeUserIdQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useQuery<MeUserIdQuery, MeUserIdQueryVariables>(
    MeUserIdDocument,
    {},
    options
  )
}
export type MeUserIdQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<MeUserIdQuery, MeUserIdQueryVariables>
export const RegisterDocument = gql`
  mutation Register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    )
  }
`

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRegisterMutation({
 *   variables: {
 *     firstName: // value for 'firstName'
 *     lastName: // value for 'lastName'
 *     email: // value for 'email'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        RegisterMutation,
        RegisterMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          RegisterMutation,
          RegisterMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument, options)
}
export type RegisterMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    RegisterMutation,
    RegisterMutationVariables
  >
export const SignInDocument = gql`
  mutation SignIn($password: String!, $email: String!) {
    signIn(password: $password, email: $email) {
      access_token
    }
  }
`

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSignInMutation({
 *   variables: {
 *     password: // value for 'password'
 *     email: // value for 'email'
 *   },
 * });
 */
export function useSignInMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SignInMutation,
        SignInMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SignInMutation,
          SignInMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    SignInMutation,
    SignInMutationVariables
  >(SignInDocument, options)
}
export type SignInMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<SignInMutation, SignInMutationVariables>
export const UpdateCommentDocument = gql`
  mutation UpdateComment($commentId: Float!, $text: String!) {
    updateComment(commentId: $commentId, text: $text) {
      id
      text
      user {
        id
        first_name
        last_name
      }
    }
  }
`

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateCommentMutation({
 *   variables: {
 *     commentId: // value for 'commentId'
 *     text: // value for 'text'
 *   },
 * });
 */
export function useUpdateCommentMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        UpdateCommentMutation,
        UpdateCommentMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          UpdateCommentMutation,
          UpdateCommentMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    UpdateCommentMutation,
    UpdateCommentMutationVariables
  >(UpdateCommentDocument, options)
}
export type UpdateCommentMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    UpdateCommentMutation,
    UpdateCommentMutationVariables
  >
