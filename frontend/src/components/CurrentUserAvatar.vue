<script setup lang="ts">
import { useMeFirstNameQuery } from "@/generated/graphql"
import { useResult } from "@vue/apollo-composable"

defineProps({
  additionalClassName: String,
})

const { result } = useMeFirstNameQuery({})

const me = useResult(result, null, (data) => data.me)
</script>

<template>
  <span :class="additionalClassName" class="circle-wrapper">
    <span style="color: initial" class="circle-wrapper__avatar">{{
      me?.first_name.charAt(0).toUpperCase()
    }}</span>
  </span>
</template>

<style>
/* 
  Styles are defined in @/assets folder
*/
</style>
