<template>
  <div class="">
    <div class="absolute left-2 hidden mt-20 z-0 dark:hidden">
      <svg width="348" height="468" viewBox="0 0 348 468" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M323.737 283.112C69.3155 376.761 154.706 468 54.2903 468C-46.1254 468 24.6094 187.87 24.6094 112.715C41.7687 -23.7028 356.488 -23.824 346.461 46.2548C269.59 118.259 397.012 200.662 323.737 283.112Z" fill="#E7E7FF" fill-opacity="0.3"/>
      </svg>
    </div>
    <div class="flex flex-col items-center h-full relative">
      <NavBar />
      <h1 class="text-3xl text-title mt-16 mb-10 dark:text-gray-200">Entrar</h1>
      <form
        action="#"
        class="flex flex-col gap-1 w-11/12 sm:w-3/4 md:w-1/2 sm:mx-auto px-6"
        autocomplete="off"
      >
        <Input id="emaiLogin" labelText="E-mail" v-model:value="this.loginData.email" />
        <Input id="passwordLogin" type="password" labelText="Senha" v-model:value="this.loginData.password" />
        <div class="relative mt-4">
          <p class="text-title dark:text-white text-center text-sm">
            Esqueceu a senha?
            <a
              href="#"
              @click.prevent="recoveryPass()"
              class="font-semibold text-primary"
              >Clique aqui</a>
          </p>
        </div>
        <div class="flex items-center justify-center mt-3">
          <button
            v-if="status.length === 0 || status[1] !== 'loading'"
            class="mt-3 py-2 bg-primary text-white focus:outline-none
              rounded hover:opacity-70 w-44 border-none"
            type="submit"
            @click.prevent="handleLogin()"
          >
            Entrar
          </button>
          <LoadingButton class="mt-3" v-else />
        </div>
        
      </form>
      <p class="text-title dark:text-gray-200 text-center mt-16">
        Não tem uma conta?
        <a
          href="#"
          @click.prevent="sendToRegister"
          class="font-semibold text-primary "
          >Registre-se</a>
      </p>
      <StatusMessage :status="this.status" />
    </div>
    <Alert v-if="this.showCustomAlert" @result="getResponseAlert" type="alert" title="Todos os campos devem ser preenchidos" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Input from '@/components/Input';
import LoadingButton from "@/components/LoadingButton";
import StatusMessage from "@/components/StatusMessage";
import NavBar from "@/components/NavBar";
import Alert from "@/components/Alert";

export default {
  components: { Input, LoadingButton, StatusMessage, NavBar, Alert },
  data() {
    return {
      showCustomAlert: false,
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
      ) {
        this.showAlert();
        return;
      }
      this.$store.dispatch("auth/signIn", this.loginData).then((a) => {
        this.$router.push("/profile");
      });
      this.showCustomAlert = false;
    },
    closeMessage() {
      this.$store.commit("resetStatus");
    },
    sendToRegister() {
      this.closeMessage();
      this.$router.push("/register");
    },
    recoveryPass() {
      this.closeMessage();
      this.$router.push("/forgot-password");
    },
    sendToHome() {
      this.closeMessage();
      this.$router.push("/");
    },
    showAlert() {
      this.showCustomAlert = true;
    },
    getResponseAlert(value) {
      this.showCustomAlert = false;
    }
  },
};
</script>