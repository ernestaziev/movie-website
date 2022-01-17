<script lang="ts" setup>
import { useGetMoviesTitleQuery } from "@/generated/graphql"
import { useResult } from "@vue/apollo-composable"
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const movieTitle = ref("")

const isInputFocus = ref(false)

const { result, refetch: refetchGetMoviesTitle } = useGetMoviesTitleQuery(
  {},
  {
    fetchPolicy: "no-cache",
  }
)
const movies = useResult(result, null, (data) => data.getMovies)

const emit = defineEmits<{
  (e: "submit", movieTitle: string): void
}>()

function onInput() {
  refetchGetMoviesTitle({ title: movieTitle.value })
}

function onSubmit() {
  emit("submit", movieTitle.value)
}

async function onClickTitle(evt: Event) {
  const title = (evt.target as HTMLElement).dataset.title

  if (!title) return

  movieTitle.value = title

  await refetchGetMoviesTitle({ title: movieTitle.value })

  onSubmit()
  router.push("/")
}

function onFocus() {
  isInputFocus.value = true
}

function onBlur() {
  isInputFocus.value = false
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="header__search search-form">
    <div class="search-form__input input-block">
      <input
        v-model="movieTitle"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        type="text"
        placeholder="Search"
        class="input-block__input input"
      />
      <transition name="slide-fade">
        <div
          v-show="movies?.length && movieTitle && isInputFocus"
          @click="onClickTitle"
          class="input-block__dropdown dropdown"
        >
          <ul class="dropdown__result">
            <!-- Is v-html safe in this case? -->
            <li
              v-for="movie in movies"
              :key="movie.imdb_id"
              :data-title="movie.title"
              v-html="
                movie.title
                  .toLowerCase()
                  .replaceAll(
                    movieTitle.toLowerCase(),
                    `<b>${movieTitle.toLowerCase()}</b>`
                  )
              "
            ></li>
          </ul></div
      ></transition>
    </div>

    <button
      v-show="movieTitle"
      @click="movieTitle = ''"
      type="reset"
      title="clear input"
      class="search-form__clear"
    ></button>
    <button title="Search" class="search-form__icon"></button>
  </form>
</template>

<style>
/* 
  Some other styles are defined in @/assets folder
*/

.header__search {
  z-index: 1;
  grid-area: 2 / 1 / span 1 / span 2;
  margin: 1em auto;
}

.search-form {
  position: relative;
  display: inline-flex;
  width: var(--search-form-width);
  min-width: 17em;
  max-width: 35em;
  background-color: white;
}

.input-block {
  display: inline-block;
  width: 100%;
}

.input-block__input {
  padding-right: calc(
    var(--search-form-icon-width) + var(--search-form-height)
  );

  border: none;
}

.slide-fade-leave-active {
  transition: 1s;
}

.slide-fade-leave-to {
  opacity: 0;
}

.input-block__dropdown {
  position: absolute;
  left: 0;
  top: 2.5em;
  min-width: calc(100% - var(--search-form-icon-width));
  max-width: 100%;
}

.dropdown {
  background-color: white;
  color: black;
}

.dropdown__result {
  padding-left: 0;
}

.dropdown__result > li {
  display: block;
  padding-left: 1em;
  max-height: 1.5em;
  list-style-type: none outside none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown__result > li:hover {
  margin: 0;
  background-color: hsl(200, 50%, 95%);
  cursor: default;
}

.search-form__clear {
  position: absolute;
  top: 50%;
  right: var(--search-form-icon-width);
  display: flex;
  justify-content: center;
  align-items: stretch;
  transform: translateY(-50%);
  width: var(--search-form-height);
  height: 96%;
  padding: 0;
  border: none;
  cursor: pointer;
  background-color: inherit;
}

.search-form__clear::before {
  position: absolute;
  top: 10px;
  content: "";
  width: 1px;
  height: 20px;
  transform: rotate(45deg);
  background: darkgray;
}

.search-form__clear::after {
  position: absolute;
  top: 10px;
  content: "";
  width: 1px;
  height: 20px;
  transform: rotate(315deg);
  background: darkgray;
}

.search-form__icon {
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--search-form-icon-width);
  height: var(--search-form-height);
  padding: 0;
  border: none;
  background-color: hsl(210, 15%, 46%);
  cursor: pointer;
}

.search-form__icon:before {
  position: absolute;
  content: "";
  width: 15px;
  height: 15px;
  transform: translate(-4px, -4px);
  border: 1.5px solid black;
  border-radius: 50%;
}

.search-form__icon:after {
  content: "";
  width: 1px;
  height: 14px;
  transform: translate(6px, 6px) rotate(315deg);
  background: black;
}

@media (min-width: 48.5rem) {
  .search-form {
    width: calc(var(--search-form-width) - 31.5em);
    grid-column: span 3;
    grid-area: initial;
    margin: auto;
  }
}
</style>
