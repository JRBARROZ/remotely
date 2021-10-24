<template>
  <div>
    <div class="absolute left-2 mt-20 z-0">
      <svg
        width="348"
        height="468"
        viewBox="0 0 348 468"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M323.737 283.112C69.3155 376.761 154.706 468 54.2903 468C-46.1254 468 24.6094 187.87 24.6094 112.715C41.7687 -23.7028 356.488 -23.824 346.461 46.2548C269.59 118.259 397.012 200.662 323.737 283.112Z"
          fill="#E7E7FF"
          fill-opacity="0.3"
        />
      </svg>
    </div>
    <div class="flex flex-col items-center h-full relative">
      <NavBar />
      <h1 class="text-3xl text-title mt-16 mb-4">Cadastro</h1>
      <div class="w-11/12 px-6">
        <form action="#" class="flex flex-col gap-1 sm:w-3/4 md:w-1/2 sm:mx-auto" autocomplete="off">
          <Input
            id="nameRegister"
            labelText="Nome" 
            v-model:value="this.currentUser.name"
          />
          <Input
            id="emailRegister"
            labelText="E-mail"
            v-model:value="this.currentUser.email"
          />
          <Input
            id="passwordRegister"
            type="password" 
            labelText="Senha" v-model:value="this.currentUser.password"
          />
          <Input
            id="confirmPasswordRegister"
            type="password" 
            labelText="Confirmar Senha" v-model:value="this.currentUser.password_confirmation"
          />
          <div class="flex flex-col items-center justify-center mt-3">
            <button
              v-if="status.length == 0 || status[1] !== 'loading'"
              class="mt-3 py-2 bg-primary text-white focus:outline-none
                rounded hover:opacity-70 w-44 border-none"
              type="submit"
              @click.prevent="handleSubmit()"
            >
              Registrar
            </button>
            <LoadingButton class="mt-3" v-else />
          </div>
        </form>
        <p class="text-title text-center mt-16">
          Já tem uma conta?
          <a
            href="#"
            @click.prevent="sendToLogin()"
            class="font-semibold text-primary"
            >Entrar</a>
        </p>
      </div>
      <StatusMessage :status="this.status" />
    </div>
    <Alert v-if="this.showCustomAlert" @result="getResponseAlert" type="alert" :title="this.alertTitle" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Input from "@/components/Input";
import LoadingButton from "@/components/LoadingButton";
import StatusMessage from "@/components/StatusMessage";
import NavBar from "@/components/NavBar";
import Alert from "@/components/Alert";

export default {
  components: { Input, LoadingButton, StatusMessage, NavBar, Alert },
  data() {
    return {
      showCustomAlert: false,
      alertTitle: '',
      currentUser: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
  name: "AddUser",
  computed: {
    ...mapState(["status"]),
  },
  methods: {
    handleSubmit() {
      if (
        this.currentUser.name.trim() === "" ||
        this.currentUser.email.trim() === "" ||
        this.currentUser.password.trim() === ""
      ) {
        this.alertTitle = "Todos os campos devem ser preenchidos";
        this.showAlert();
        return;
      }
        
      if (this.currentUser.password !== this.currentUser.password_confirmation) {
        this.alertTitle = "As senhas informadas são diferentes";
        this.showAlert();
        return;
      }

      this.$store.commit("request", null);
      this.$store.dispatch("auth/signUp", this.currentUser)
        .then((res) => {
          if (res.status === 201) this.$router.push("/login");
        })
        .catch((error) => console.log('err:',error.response));
    },
    closeMessage() {
      this.$store.commit("resetStatus");
    },
    sendToLogin() {
      this.closeMessage();
      this.$router.push("/login");
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