<script setup lang="ts">
import { useApolloClient } from "@vue/apollo-composable"
import { provide, readonly, ref, watchEffect } from "vue"
import { BACKEND_URL } from "./main"
import { clearToken, isAuthenticated, saveToken } from "./utils/auth"

const isLoading = ref<boolean>(true)

const { client } = useApolloClient()

watchEffect(() => {
  fetch(`${BACKEND_URL}/refresh-token`, {
    method: "POST",
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.success && data?.access_token) {
        saveToken(data?.access_token)
        isLoading.value = false
      } else {
        resetAuth()
        isLoading.value = false
      }
    })
})

const isAuth = ref<boolean>(isAuthenticated())
function resetAuth() {
  client.resetStore()
  clearToken()
  isAuth.value = isAuthenticated()
}

provide("isAuth", readonly(isAuth))
provide("resetAuth", resetAuth)
</script>

<template>
  <h1 v-if="isLoading">Loading...</h1>
  <router-view v-else />
</template>
