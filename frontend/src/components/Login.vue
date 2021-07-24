<template>
  <div class="flex flex-col items-center justify-center mt-10">
    <img src="/icons/clock.svg" alt="clock" class="h-10 w-10">
    <h1 class="text-3xl text-title mt-2">Bem-vindo ao</h1>
    <h1 class="text-3xl text-title mb-10">Remotely</h1>
    <form
      action="#"
      class="flex flex-col gap-1 w-11/12 sm:w-8/12 lg:w-6/12 px-6 sm:px-16"
      autocomplete="off"
    >
      <div class="relative">
        <input
          type="text"
          class="text-gray-600 peer h-10 w-full border rounded pl-2 bg-input
           placeholder-transparent focus:outline-none"
          id="emailLogin"
          placeholder="E-mail"
          v-model="loginData.email"
        />
        <label
          for="emailLogin"
          class="absolute left-2 -top-5 text-input-text text-sm transition-all
            peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
            peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:left-0
            peer-focus:text-title peer-focus:text-sm"
          >E-mail</label
        >
      </div>
      <div class="relative mt-6">
        <input
          type="password"
          class="text-gray-600 peer h-10 w-full border rounded pl-2 bg-input
           placeholder-transparent focus:outline-none"
          placeholder="Password"
          id="passwordLogin"
          v-model="loginData.password"
        />
        <label
          for="passwordLogin"
          class="absolute left-2 -top-5 text-input-text text-sm transition-all
            peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
            peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:left-0
            peer-focus:text-title peer-focus:text-sm"
          >Password</label
        >
      <p class="text-title text-right text-sm pt-1">
        Esqueceu a senha?
        <a
          href="#"
          @click.prevent="recoveryPass"
          class="font-semibold text-primary"
        >Clique aqui</a>
      </p>
      </div>
      <div class="flex items-center justify-center mt-3">
        <button
          class="mt-3 py-2 bg-primary text-white focus:outline-none
            border-none rounded hover:opacity-70 w-7/12"
          type="submit"
          @click.prevent="handleLogin()"
        >
          Login
        </button>
      </div>
      <p class="text-title text-center mt-32">
        Não tem uma conta?
        <a
          href="#"
          @click.prevent="register"
          class="font-semibold text-primary"
        >Cadastre-se</a>
      </p>
    </form>
    <div
      class="mt-6 rounded border py-3 px-8"
      :class="
        status[0] === 'success'
          ? 'bg-green-300 text-green-700 border-green-700'
          : status[0] === 'error'
          ? 'bg-red-300 text-red-700 border-red-700'
          : status[0] === 'warning'
          ? 'bg-yellow-300 text-yellow-700 border-yellow-700'
          : ''
      "
      v-if="status.length > 0"
    >
      {{ status[1] }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  created() {
    setTimeout(() => {
      this.$store.commit("resetStatus");
    }, 2500);
  },
  data() {
    return {
      loginData: {
        email: "",
        password: "",
      },
    };
  },
  name: "Login",
  computed: {
    ...mapState(["status"]),
  },
  methods: {
    handleLogin() {
      if (
        this.loginData.email.trim() === "" ||
        this.loginData.password.trim() === ""
      )
        return alert("all fields must be filled in");
      this.$store.dispatch("auth/signIn", this.loginData).then((a) => {
        this.$router.push("/profile");
      });
    },
  },
};
</script>