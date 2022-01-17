<script setup lang="ts">
import AuthCard from "@/components/AuthCard.vue"
import { useRegisterMutation } from "@/generated/graphql"
import { ApolloError } from "@apollo/client/errors"
import { computed, reactive, ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const { mutate: registerUser, loading } = useRegisterMutation({})

const emailError = ref("")
const existedUsers: string[] = []
const wereFocused = reactive([false, false, false, false])

const formValues = reactive({
  firstname: "",
  lastname: "",
  email: "",
  password: "",
})

const PATTERNS = [
  /^[A-Za-z0-9]{2,16}$/,
  /^[A-Za-z0-9]{2,16}$/,
  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
  /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
]

const areValid = computed(() =>
  Object.values(formValues).map((formValue, index) => {
    return PATTERNS[index].test(formValue)
  })
)

const isButtonDisabled = computed(
  () =>
    areValid.value.includes(false) || loading.value || emailError.value !== ""
)

async function handleSubmit() {
  try {
    const response = await registerUser({
      firstName: formValues.firstname,
      lastName: formValues.lastname,
      email: formValues.email.toLowerCase(),
      password: formValues.password,
    })

    if (response?.data?.register === true) {
      router.push("/signin")
      return
    }
  } catch (error) {
    if (
      error instanceof ApolloError &&
      error.message === "User with that email is already exist"
    ) {
      emailError.value = "User with that email is already exist"
      existedUsers.push(formValues.email.toLowerCase())
    }

    console.error(error)
  }
}

function emailInputHandler() {
  !existedUsers.includes(formValues.email.toLowerCase())
    ? (emailError.value = "")
    : (emailError.value = "User with that email is already exist")
}
</script>

<template>
  <AuthCard @submit="handleSubmit" :disabled="isButtonDisabled">
    <template #title>Create account</template>
    <template #inputs>
      <input
        v-model="formValues.firstname"
        @focus="wereFocused[0] = true"
        type="text"
        name="firstname"
        placeholder="First name"
        class="card__input input"
      />
      <small v-show="!areValid[0] && wereFocused[0]" style="color: red"
        >First name should be 2-16 characters and shouldn't include any special
        character!</small
      >
      <input
        v-model="formValues.lastname"
        @focus="wereFocused[1] = true"
        type="text"
        name="lastname"
        placeholder="Last name"
        class="card__input input"
      />
      <small v-show="!areValid[1] && wereFocused[1]" style="color: red"
        >Last name should be 2-16 characters and shouldn't include any special
        character!</small
      >
      <input
        v-model="formValues.email"
        @focus="wereFocused[2] = true"
        @input="emailInputHandler"
        type="email"
        name="email"
        placeholder="Email"
        title="Your email"
        class="card__input input"
      />
      <small
        v-show="(!areValid[2] && wereFocused[2]) || emailError"
        style="color: red"
        >{{ emailError || "It should be a valid email address!" }}</small
      >
      <input
        v-model="formValues.password"
        @focus="wereFocused[3] = true"
        type="password"
        name="password"
        placeholder="Password"
        class="card__input input"
      />
      <small v-show="!areValid[3] && wereFocused[3]" style="color: red"
        >Password should be 8-20 characters and include at least 1 letter, 1
        number and 1 special character!</small
      >
    </template>
    <template #bottom>
      <small
        >Already have<br />
        an account? <router-link to="/signin">Sign in</router-link></small
      >
    </template>

    <template #button>{{ loading ? "..." : "Register" }}</template>
  </AuthCard>
</template>
