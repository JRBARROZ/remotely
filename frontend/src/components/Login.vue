<template>
  <div class="flex flex-col items-center h-screen relative">
    <div class="hover:cursor-pointer flex items-center gap-2 absolute top-4 left-auto" @click="sendToHome">
      <svg v-if="status[1] === 'Loading...'" class="w-8 h-8 animate-spin"  viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.0787 0C32.5618 0 42 9.4382 42 21.0787C42 32.5618 32.5618 42 21.0787 42C9.4382 42 0 32.5618 0 21.0787C0 9.4382 9.4382 0 21.0787 0ZM18.8764 9.59551C18.8764 7.55056 22.0225 7.55056 22.0225 9.59551V20.764L29.2584 22.809C31.1461 23.4382 30.3596 26.427 28.3146 25.9551L20.1348 23.4382C19.3483 23.2809 18.8764 22.6517 18.8764 21.8652V9.59551ZM21.0787 3.14607C11.1685 3.14607 3.14607 11.1685 3.14607 21.0787C3.14607 30.8315 11.1685 38.8539 21.0787 38.8539C30.8315 38.8539 38.8539 30.8315 38.8539 21.0787C38.8539 11.1685 30.8315 3.14607 21.0787 3.14607Z" fill="#58588B"/>
      </svg>
      <svg v-else class="w-8 h-8"  viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.0787 0C32.5618 0 42 9.4382 42 21.0787C42 32.5618 32.5618 42 21.0787 42C9.4382 42 0 32.5618 0 21.0787C0 9.4382 9.4382 0 21.0787 0ZM18.8764 9.59551C18.8764 7.55056 22.0225 7.55056 22.0225 9.59551V20.764L29.2584 22.809C31.1461 23.4382 30.3596 26.427 28.3146 25.9551L20.1348 23.4382C19.3483 23.2809 18.8764 22.6517 18.8764 21.8652V9.59551ZM21.0787 3.14607C11.1685 3.14607 3.14607 11.1685 3.14607 21.0787C3.14607 30.8315 11.1685 38.8539 21.0787 38.8539C30.8315 38.8539 38.8539 30.8315 38.8539 21.0787C38.8539 11.1685 30.8315 3.14607 21.0787 3.14607Z" fill="#58588B"/>
      </svg>
      <h1 class="text-2xl text-title">Remotely</h1>
    </div>
    <h1 class="text-3xl text-title mt-24 mb-10">Entrar</h1>
    <form
      action="#"
      class="flex flex-col gap-1 w-11/12 sm:w-8/12 lg:w-6/12 px-6 sm:px-16"
      autocomplete="off"
    >
      <div class="relative">
        <input
          type="text"
          class="
            text-gray-600
            peer
            h-10
            w-full
            border
            rounded
            pl-2
            bg-input
            placeholder-transparent
            focus:outline-none
          "
          id="emailLogin"
          placeholder="E-mail"
          v-model="loginData.email"
        />
        <label
          for="emailLogin"
          class="
            absolute
            left-2
            -top-5
            text-input-text text-sm
            transition-all
            peer-placeholder-shown:text-base
            peer-placeholder-shown:text-gray-400
            peer-placeholder-shown:top-2
            peer-focus:-top-5
            peer-focus:left-0
            peer-focus:text-title
            peer-focus:text-sm
          "
          >E-mail</label
        >
      </div>
      <div class="relative mt-6">
        <input
          type="password"
          class="
            text-gray-600
            peer
            h-10
            w-full
            border
            rounded
            pl-2
            bg-input
            placeholder-transparent
            focus:outline-none
          "
          placeholder="Password"
          id="passwordLogin"
          v-model="loginData.password"
        />
        <label
          for="passwordLogin"
          class="
            absolute
            left-2
            -top-5
            text-input-text text-sm
            transition-all
            peer-placeholder-shown:text-base
            peer-placeholder-shown:text-gray-400
            peer-placeholder-shown:top-2
            peer-focus:-top-5
            peer-focus:left-0
            peer-focus:text-title
            peer-focus:text-sm
          "
          >Password</label
        >
        <p class="text-title text-center text-sm mt-4">
          Esqueceu a senha?
          <a
            href="#"
            @click.prevent="recoveryPass()"
            class="font-semibold text-primary"
            >Clique aqui</a
          >
        </p>
      </div>
      <div class="flex items-center justify-center mt-3">
        <button
          class="
            mt-3
            py-2
            bg-primary
            text-white
            focus:outline-none
            rounded
            hover:opacity-70
            w-7/12
            border-none
          "
          type="submit"
          @click.prevent="handleLogin()"
        >
          Entrar
        </button>
      </div>
    </form>
    <div
      class="
        mt-6
        rounded
        border
        h-16
        py-3
        px-8
        relative
        flex
        items-center
        justify-center
      "
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
      <svg @click="closeMessage()"
        class="cursor-pointer w-10 h-10 absolute top-1 -right-3"
        xmlns="http://www.w3.org/2000/svg">
        <path
          class="fill-current"
          :class="
            status[0] === 'success'
              ? 'text-green-700'
              : status[0] === 'error'
              ? 'text-red-700'
              : status[0] === 'warning'
              ? 'text-yellow-700'
              : ''
          "
          d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
        />
      </svg>
      {{ status[1] }}
    </div>
    <p class="text-title text-center mt-16">
      Não tem uma conta?
      <a
        href="#"
        @click.prevent="sendToRegister"
        class="font-semibold text-primary"
        >Registre-se</a
      >
    </p>
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
    closeMessage() {
      this.$store.commit("resetStatus");
    },
    sendToRegister() {
      this.$router.push("/register");
    },
    recoveryPass() {
      this.$router.push("/forgot-password");
    },
    sendToHome() {
      this.$router.push("/");
    }
  },
};
</script>