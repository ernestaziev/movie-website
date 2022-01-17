<script setup lang="ts">
defineProps({
  disabled: Boolean,
})

const emit = defineEmits<{
  (e: "submit"): void
}>()

function onSubmit() {
  emit("submit")
}
</script>

<template>
  <div class="auth card">
    <h3 class="card__title"><slot name="title"></slot></h3>
    <form @submit.prevent="onSubmit">
      <slot name="inputs"></slot>
      <div class="flex-space-between">
        <slot name="bottom"></slot>
        <button
          :disabled="disabled"
          type="submit"
          class="card__btn card__btn_regular card__btn_small"
        >
          <slot name="button"></slot>
        </button>
      </div>
    </form>
  </div>
</template>

<style>
/* 
  Styles are defined in @/assets folder
*/
</style>
