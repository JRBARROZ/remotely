<template>
  <div class="mt-4">
    <div class="absolute left-2 mt-20 z-0" @click="sendToHome">
      <svg width="348" height="468" viewBox="0 0 348 468" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M323.737 283.112C69.3155 376.761 154.706 468 54.2903 468C-46.1254 468 24.6094 187.87 24.6094 112.715C41.7687 -23.7028 356.488 -23.824 346.461 46.2548C269.59 118.259 397.012 200.662 323.737 283.112Z" fill="#E7E7FF" fill-opacity="0.3"/>
      </svg>
    </div>
    <div class="flex flex-col items-center h-full relative">
      <div class="flex items-center gap-2 absolute top-4 left-auto cursor-pointer" @click="sendToHome">
        <svg v-if="status[1] === 'loading'" class="w-8 h-8 animate-spin"  viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.0787 0C32.5618 0 42 9.4382 42 21.0787C42 32.5618 32.5618 42 21.0787 42C9.4382 42 0 32.5618 0 21.0787C0 9.4382 9.4382 0 21.0787 0ZM18.8764 9.59551C18.8764 7.55056 22.0225 7.55056 22.0225 9.59551V20.764L29.2584 22.809C31.1461 23.4382 30.3596 26.427 28.3146 25.9551L20.1348 23.4382C19.3483 23.2809 18.8764 22.6517 18.8764 21.8652V9.59551ZM21.0787 3.14607C11.1685 3.14607 3.14607 11.1685 3.14607 21.0787C3.14607 30.8315 11.1685 38.8539 21.0787 38.8539C30.8315 38.8539 38.8539 30.8315 38.8539 21.0787C38.8539 11.1685 30.8315 3.14607 21.0787 3.14607Z" fill="#58588B"/>
        </svg>
        <svg v-else class="w-8 h-8"  viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.0787 0C32.5618 0 42 9.4382 42 21.0787C42 32.5618 32.5618 42 21.0787 42C9.4382 42 0 32.5618 0 21.0787C0 9.4382 9.4382 0 21.0787 0ZM18.8764 9.59551C18.8764 7.55056 22.0225 7.55056 22.0225 9.59551V20.764L29.2584 22.809C31.1461 23.4382 30.3596 26.427 28.3146 25.9551L20.1348 23.4382C19.3483 23.2809 18.8764 22.6517 18.8764 21.8652V9.59551ZM21.0787 3.14607C11.1685 3.14607 3.14607 11.1685 3.14607 21.0787C3.14607 30.8315 11.1685 38.8539 21.0787 38.8539C30.8315 38.8539 38.8539 30.8315 38.8539 21.0787C38.8539 11.1685 30.8315 3.14607 21.0787 3.14607Z" fill="#58588B"/>
        </svg>
        <h1 class="text-2xl text-title">Remotely</h1>
      </div>
      <h1 class="text-3xl text-title mt-24 mb-10">Recuperar Senha</h1>
      <form
        action="#"
        class="flex flex-col gap-1 w-11/12 sm:w-8/12 lg:w-6/12 px-6 sm:px-16"
        autocomplete="off"
      >
        <Input id="emaiLogin" labelText="E-mail" @getValue="(e) => this.loginData.email = e" />
        <div class="flex items-center justify-center mt-3">
          <button v-if="status.length === 0 || status[1] !== 'loading'"
            class="mt-3 py-2 bg-primary text-white focus:outline-none
              border-none rounded hover:opacity-70 w-44"
            type="submit"
            @click.prevent="handleSubmit()"
          >
            Recuperar
          </button>
          <LoadingButton v-else class="mt-3" />
        </div>
        <div class="flex gap-2 items-center justify-center mt-10">
          <a
            href="#"
            @click.prevent="sendToRegister"
            class="font-semibold text-primary"
            >Cadastre-se</a>
            <span class="text-title">|</span>
          <a
            href="#"
            @click.prevent="sendToLogin()"
            class="font-semibold text-primary"
          >Entre</a>
        </div>
      </form>
      <StatusMessage :status="this.status" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Input from "./Input";
import LoadingButton from "./LoadingButton";
import StatusMessage from "./StatusMessage";

export default {
  components: { Input, LoadingButton, StatusMessage },
  created() {
    this.$store.commit('resetStatus');
  },
  data() {
    return {
      loginData: {
        email: "",
      },
    };
  },
  name: "Login",
  computed: {
    ...mapState(["status"]),
  },
  methods: {
    handleSubmit() {
      if (this.loginData.email.trim() === "")
        return alert("all fields must be filled in");
      this.$store.commit('request');
      this.$store.dispatch("auth/forgotPassword", this.loginData.email).then((a) => {
        this.loginData.email = '';
      });
    },
    closeMessage() {
      this.$store.commit("resetStatus");
    },
    sendToLogin() {
      this.$router.push("/login");
    },
    sendToRegister() {
      this.$router.push("/register");
    },
    sendToHome() {
      this.$router.push("/");
    },
  },
};
</script>