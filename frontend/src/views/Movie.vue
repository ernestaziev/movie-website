<script setup lang="ts">
import { useGetMoviePlotQuery } from "@/generated/graphql"
import { useRoute } from "vue-router"
import MovieComments from "@/components/MovieComments.vue"
import { useResult } from "@vue/apollo-composable"

const { result } = useGetMoviePlotQuery({
  movieId: Number(useRoute().params.id),
})

const moviePlot = useResult(result, null, (data) => data.getMovie.plot)
</script>

<template>
  <div style="flex-direction: column" class="flex-center movie">
    <iframe
      class="movie__iframe"
      src="https://www.youtube-nocookie.com/embed/AhbCYVILusc"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>

    <div class="movie__plot">
      {{ moviePlot }}
    </div>

    <MovieComments />
  </div>
</template>

<style>
/* 
  Some other styles are defined in @/assets folder
*/
.movie {
  --width: 100%;
  --height: 50vh;
  --min-height: 250px;
}

.movie__iframe {
  width: var(--width);
  height: var(--height);
  min-height: var(--min-height);
}

.movie__plot {
  margin: 15px 0;
  width: var(--width);
  font-family: sans-serif;
}

.movie_comment {
  width: var(--width);
}

@media (min-width: 48.5rem) {
  .movie {
    --width: 50vw;
    --height: 60vh;
    --min-height: 300px;
  }
}
</style>
