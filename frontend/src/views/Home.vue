<script setup lang="ts">
import HeaderProfile from "@/components/HeaderProfile.vue"
import { useGetMoviesQuery } from "../generated/graphql"
import { ref } from "vue"
import { useResult } from "@vue/apollo-composable"
import HeaderSearchForm from "@/components/HeaderSearchForm.vue"

const { result, loading, error, refetch, fetchMore } = useGetMoviesQuery({
  offset: 0,
  limit: 15,
})

const movies = useResult(result, null, (data) => data.getMovies)

const movieTitle = ref<string>("")

function handleSubmit(title: string) {
  movieTitle.value = title
  refetch({ title: movieTitle.value })
}

function handleIntersect() {
  fetchMore({
    variables: {
      title: movieTitle.value,
      offset: movies.value?.length,
    },
  })
}
</script>

<template>
  <div class="container">
    <header class="header">
      <h1 class="header__page">
        <router-link to="/" @click="handleSubmit('')" class="link"
          >Lorem</router-link
        >
      </h1>
      <HeaderSearchForm @submit="handleSubmit" />
      <HeaderProfile />
    </header>
    <hr />
    <main>
      <router-view
        :movies="movies"
        :loading="loading"
        :error="error?.message"
        @intersect="handleIntersect"
      ></router-view>
    </main>
  </div>
</template>

<style>
/* 
  Some other styles are defined in @/assets folder
*/

.container {
  margin: 0 4rem;
}

.header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0.5rem 0;
}

@media (min-width: 48.5rem) {
  .container {
    margin: 0 3rem;
  }

  .header {
    grid-template-columns: repeat(3, 1fr);
    margin: 1.2rem 0;
  }

  .header__page {
    text-align: center;
  }
}
</style>
