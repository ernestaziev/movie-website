<script setup lang="ts">
import { inject } from "vue"
import { useLogoutMutation } from "@/generated/graphql"
import { useRouter } from "vue-router"
import CurrentUserAvatar from "./CurrentUserAvatar.vue"

const router = useRouter()

const isAuth = inject("isAuth")
const resetAuth = inject<any>("resetAuth")

const { mutate: logout } = useLogoutMutation()

async function onLogoutHandler() {
  try {
    await logout()
    resetAuth()
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div v-if="isAuth" @click="onLogoutHandler" class="header__profile profile">
    <CurrentUserAvatar additional-class-name="profile__wrapper" />
    <span style="margin-left: 5px" class="profile__label">LOG OUT</span>
  </div>

  <div v-else @click="router.push('/signin')" class="header__profile profile">
    <span
      style="background-color: inherit; border: solid 1px"
      class="profile__wrapper circle-wrapper"
    >
      <span class="circle-wrapper__icon"></span>
    </span>
    <span style="margin-left: 10px" class="profile__label">SIGN IN</span>
  </div>
</template>

<style>
.header__profile {
  margin: auto 0;
  margin-inline-start: auto;
}

.profile {
  width: 120px;
  border: solid 2px;
  cursor: pointer;
  color: inherit;
}

.profile__wrapper {
  position: relative;
  margin-top: 6px;
  margin-left: 11px;
}

.circle-wrapper {
  display: inline-block;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  background-color: green;
  text-align: center;
}

.circle-wrapper__avatar {
  vertical-align: text-bottom;
  font-family: Arial;
  line-height: 1.5;
  font-size: 1.25em;
}

.circle-wrapper__icon {
  position: absolute;
  top: 16px;
  left: 6px;
  width: 14px;
  height: 6px;
  border-left: solid 1px;
  border-right: solid 1px;
  border-top: solid 1px;
  border-bottom: solid 1px transparent;
  border-radius: 6px 6px 0 0;
}

.circle-wrapper__icon:before {
  position: absolute;
  left: 2px;
  top: -10px;
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: solid 1px;
}

.profile__label {
  vertical-align: super;
}

@media (min-width: 48.5rem) {
  .header__profile {
    margin: auto;
  }
}
</style>
