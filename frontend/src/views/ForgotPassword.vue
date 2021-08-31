<template>
  <div>
    <div class="absolute left-2 mt-20 z-0">
      <svg width="348" height="468" viewBox="0 0 348 468" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M323.737 283.112C69.3155 376.761 154.706 468 54.2903 468C-46.1254 468 24.6094 187.87 24.6094 112.715C41.7687 -23.7028 356.488 -23.824 346.461 46.2548C269.59 118.259 397.012 200.662 323.737 283.112Z" fill="#E7E7FF" fill-opacity="0.3"/>
      </svg>
    </div>
    <div class="flex flex-col items-center h-full relative">
      <NavBar />
      <h1 class="text-3xl text-title mt-16 mb-10">Recuperar Senha</h1>
      <form
        action="#"
        class="flex flex-col gap-1 w-11/12 sm:w-3/4 md:w-1/2 sm:mx-auto px-6"
        autocomplete="off"
      >
        <Input id="emaiLogin" labelText="E-mail" v-model:value="this.loginData.email" />
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
import Input from "@/components/Input";
import LoadingButton from "@/components/LoadingButton";
import StatusMessage from "@/components/StatusMessage";
import NavBar from "@/components/NavBar";

export default {
  components: { Input, LoadingButton, StatusMessage, NavBar },
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
        return alert("O campo e-mail deve ser preenchido!");
      this.$store.commit('request');
      this.$store.dispatch("auth/forgotPassword", this.loginData.email).then((a) => {
        this.loginData.email = '';
      });
    },
    closeMessage() {
      this.$store.commit("resetStatus");
    },
    sendToLogin() {
      this.closeMessage();
      this.$router.push("/login");
    },
    sendToRegister() {
      this.closeMessage();
      this.$router.push("/register");
    },
    sendToHome() {
      this.closeMessage();
      this.$router.push("/");
    },
  },
};
</script>