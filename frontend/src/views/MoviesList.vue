<script lang="ts">
import IntersectionObserver from "@/components/IntersectionObserver.vue"
import { defineComponent, PropType } from "vue"
import { minutesToHours } from "@/utils/minutesToHour"
import { useRouter } from "vue-router"

export default defineComponent({
  components: {
    IntersectionObserver,
  },

  props: {
    movies: {
      type: Array as PropType<
        | {
            imdb_id: number
            title: string
            year: number
            runtime: number
            poster: string
            imdb_rating: number
          }[]
      >,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    error: {
      type: String,
    },
  },

  emits: ["intersect"],

  setup(props, { emit }) {
    const router = useRouter()

    function intersected() {
      emit("intersect")
    }

    function insertRatingClass(rating: number): string {
      if (rating >= 9) {
        return "card__badge_excellent"
      }

      if (rating >= 8.5 && rating < 9) {
        return "card__badge_good"
      }

      return "card__badge_regular"
    }

    return {
      props,
      intersected,
      minutesToHours,
      insertRatingClass,
      router,
    }
  },
})
</script>

<template>
  <div v-if="props.loading">Loading...</div>
  <div v-else-if="props.error">{{ error }}</div>

  <div v-else class="movies-list">
    <div
      v-for="movie in props.movies"
      :key="movie.imdb_id"
      class="movies-list__item card"
    >
      <img :src="movie.poster" alt="poster" class="card__img" />
      <h4 class="card__title">{{ movie.title }}</h4>
      <span
        style="width: 40%; margin: 0 5%"
        class="card__badge card__badge_regular"
        >year: {{ movie.year }}</span
      >
      <span
        :class="insertRatingClass(movie.imdb_rating)"
        style="width: 40%; margin: 0 5%"
        class="card__badge"
      >
        IMDB: {{ movie.imdb_rating }}/10
      </span>
      <div class="card__runtime">
        runtime: <i>{{ minutesToHours(movie.runtime) }}</i>
      </div>
      <div class="flex-center">
        <button
          @click="router.push({ name: 'movie', params: { id: movie.imdb_id } })"
          type="button"
          class="card__btn card__btn_regular card__btn_medium"
        >
          Watch
        </button>
      </div>
    </div>
    <IntersectionObserver @intersect="intersected" />
  </div>
</template>

<style>
/* 
  Some other styles are defined in @/assets folder
*/
.movies-list {
  margin: 2.15em auto;
}

.movies-list__item {
  margin-left: 0.5em;
  margin-right: 0.5em;
  max-width: 600px;
  height: 33rem;
}

@media (min-width: 35rem) {
  .movies-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 1em;
  }

  .movies-list__item {
    margin: 0;
  }
}

@media (min-width: 48.5rem) {
  .movies-list__item {
    max-width: 43vw;
  }
}

@media (min-width: 68rem) {
  .movies-list {
    max-width: 1000px;
  }

  .movies-list__item {
    max-width: 28vw;
  }
}
</style>
