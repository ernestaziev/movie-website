<script setup lang="ts">
import AuthCard from "@/components/AuthCard.vue"
import { useSignInMutation } from "@/generated/graphql"
import { isAuthenticated, saveToken } from "@/utils/auth"
import { ApolloError } from "@apollo/client/errors"
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

if (isAuthenticated()) {
  router.replace("/")
}

const hasError = ref(false)

const formValues = reactive({
  email: "",
  password: "",
})

const { mutate: signInUser, loading } = useSignInMutation({})

async function handleSubmit() {
  try {
    const response = await signInUser({
      email: formValues.email,
      password: formValues.password,
    })

    if (response?.data?.signIn.access_token) {
      saveToken(response.data.signIn.access_token)
      router.push("/")
      location.reload()
      return
    }
  } catch (error) {
    if (error instanceof ApolloError) {
      hasError.value = true
    }

    console.error(error)
  }
}
</script>

<template>
  <AuthCard @submit="handleSubmit" :disabled="loading">
    <template #title>Sign in</template>
    <template #inputs>
      <input
        v-model="formValues.email"
        @input="hasError = false"
        type="email"
        name="email"
        placeholder="Email"
        title="Your email"
        class="card__input input"
      />
      <small v-show="hasError" style="color: red"
        >Please, provide correct email</small
      >
      <input
        v-model="formValues.password"
        @input="hasError = false"
        type="password"
        name="password"
        placeholder="Password"
        class="card__input input"
      />
      <small v-show="hasError" style="color: red"
        >Please, provide correct password</small
      >
    </template>
    <template #bottom>
      <small><router-link to="/register">Create account</router-link></small>
    </template>

    <template #button>Sign in</template>
  </AuthCard>
</template>
