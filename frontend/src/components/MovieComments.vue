<script setup lang="ts">
  import {
  GetCommentsDocument,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
  useMeUserIdQuery,
  useUpdateCommentMutation,
} from "@/generated/graphql"
import { useResult } from "@vue/apollo-composable"
import { inject, ref } from "vue"
import { useRoute } from "vue-router"
import CurrentUserAvatar from "./CurrentUserAvatar.vue"

const route = useRoute()

const isAuth = inject("isAuth")

const selectedCommentId = ref()
const commentText = ref("")

const { result: currentUserId } = useMeUserIdQuery()
const userId = useResult(currentUserId, null, (data) => data.me.id)

const { result: userComments } = useGetCommentsQuery({
  movieId: Number(route.params.id),
})
const comments = useResult(userComments)

const { mutate: addComment, loading } = useAddCommentMutation({})

const { mutate: deleteComment } = useDeleteCommentMutation({
  update(cache) {
    const normalizedId = cache.identify({
      id: selectedCommentId.value,
      __typename: "Comment",
    })
    cache.evict({ id: normalizedId })
    cache.gc()
  },
})

const { mutate: updateComment } = useUpdateCommentMutation({
  update(cache, newComment) {
    cache.writeQuery({
      query: GetCommentsDocument,
      data: {
        getComments: comments.value?.map((comment) => {
          if (comment.id === selectedCommentId.value) {
            return newComment
          }
          return comment
        }),
      },
    })
  },
})

async function addNewComment() {
  if (!commentText.value.trim()) {
    alert("Your comment cannot be empty")
    return
  }

  await addComment({
    text: commentText.value,
    movieId: Number(route.params.id),
  }).catch((reason) => {
    alert(reason)
  })

  location.reload()

  clearInput()
}

function updateTheComment(id: number) {
  selectedCommentId.value = id
  const text = prompt("update your comment")
  if (!text?.trim()) {
    alert("Your comment cannot be empty")
    return
  }

  if (!selectedCommentId.value) return

  updateComment({ commentId: id, text }).catch((error) => alert(error))
}

function deleteTheComment(id: number) {
  selectedCommentId.value = id

  const isSure = confirm("Are you sure you want to delete the comment?")

  if (isSure) {
    deleteComment({ commentId: id }).catch((error) => alert(error))
  }
}

function clearInput() {
  commentText.value = ""
}
</script>
<template>
  <div v-if="comments?.length || isAuth" style="padding: 30px" class="movie_comment card">
    <form v-if="isAuth" @submit.prevent="addNewComment" class="form-comment">
      <div class="flex-space-between">
        <CurrentUserAvatar additional-class-name="comment__avatar" />
        <textarea v-model="commentText" type="text" placeholder="Write your comment here" class="textarea"></textarea>
      </div>
      <div style="margin-bottom: 4rem">
        <button :disabled="loading" type="submit" style="float: right" class="card__btn card__btn_regular card__btn_small">
          add comment
        </button>
        <button @click="clearInput" type="button" style="float: right" class="card__btn card__btn_cancel card__btn_medium">
          cancel
        </button>
      </div>
    </form>
    <ul v-show="comments" class="comment-list">
      <li v-for="comment in comments" :key="comment.id" class="comment">
        <div class="flex-stretch">
          <div class="comment__avatar circle-wrapper">
            <span class="circle-wrapper__avatar">{{
              comment.user.first_name.charAt(0).toUpperCase()
              }}</span>
          </div>
          <div class="comment__content">
            <h4 class="author">
              {{ comment.user.first_name + " " + comment.user.last_name }}
            </h4>
            <div class="text">
              {{ comment.text }}
            </div>
          </div>
          <div v-if="comment.user.id === userId" class="comment__icons icons">
            <div @click="updateTheComment(comment.id)" title="edit comment" class="icons__edit edit"></div>
            <div @click="deleteTheComment(comment.id)" title="delete comment" class="icons__trash trash"></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<style>
/*styles for "movie_comment" class are defined in @/views/Movie.vue*/

/* 
  Some other styles are defined in @/assets folder
*/

.comment__icons {
  position: relative;
}

.icons {
  width: 5em;
}

.icons__edit {
  position: absolute;
  right: 23px;
  top: 0;
}

.edit {
  transform: rotate(-45deg);
  width: 20px;
  height: 5px;
  border-radius: 1px;
  border: solid 1px currentColor;
  color: #000;
  cursor: pointer;
}

.edit:before {
  position: absolute;
  left: -12px;
  top: -1px;
  content: "";
  width: 6px;
  height: 5px;
  border-left: solid 5px transparent;
  border-right: solid 5px currentColor;
  border-top: solid 2px transparent;
  border-bottom: solid 2px transparent;
}

.icons__trash {
  position: absolute;
  right: 0;
  top: 0;
}

.trash {
  width: 12px;
  height: 13px;
  border-left: solid 1px currentColor;
  border-right: solid 1px currentColor;
  border-bottom: solid 1px currentColor;
  border-radius: 0 0 2px 2px;
  color: #000;
  cursor: pointer;
}

.trash:before {
  position: absolute;
  left: -5px;
  top: -2px;
  width: 20px;
  height: 1px;
  content: "";
  background-color: currentColor;
}

.trash:after {
  position: absolute;
  left: 0px;
  top: -6px;
  content: "";
  width: 10px;
  height: 4px;
  border-left: solid 1px currentColor;
  border-right: solid 1px currentColor;
  border-top: solid 1px currentColor;
  border-radius: 4px 4px 0 0;
}

.comment-list {
  padding: 0;
}

.comment {
  margin-top: 1rem;
  list-style-type: none;
}

.textarea {
  width: 100%;
  overflow: hidden;
  font-size: 1.1rem;
  border-top: none;
  border-left: none;
  border-right: none;
  resize: none;
}

.textarea:focus {
  outline: none;
  border-bottom: solid 1px;
}

.comment__avatar {
  margin-right: 1rem;
}

.comment__content {
  flex-grow: 1;
}

.author {
  margin: 0;
}
</style>