<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"

const observedEl = ref(null)
const observer = ref()

const emit = defineEmits<{
  (e: "intersect"): void
}>()

onMounted(() => {
  observer.value = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) emit("intersect")
  })

  observer.value.observe(observedEl.value)
})
onUnmounted(() => {
  observer.value.disconnect()
})
</script>

<template>
  <div ref="observedEl"></div>
</template>
