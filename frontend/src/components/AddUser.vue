<template>
<div class="mt-4">
  <div class="absolute left-7 mt-20 z-0">
    <svg width="348" height="468" viewBox="0 0 348 468" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M323.737 283.112C69.3155 376.761 154.706 468 54.2903 468C-46.1254 468 24.6094 187.87 24.6094 112.715C41.7687 -23.7028 356.488 -23.824 346.461 46.2548C269.59 118.259 397.012 200.662 323.737 283.112Z" fill="#E7E7FF" fill-opacity="0.3"/>
    </svg>
  </div>
  <div class="flex flex-col items-center h-full relative">
    <div class="flex items-center gap-2 absolute top-4 left-auto hover:cursor-pointer" @click="sendToHome">
      <svg v-if="status[1] === 'Loading...'" class="w-8 h-8 animate-spin"  viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.0787 0C32.5618 0 42 9.4382 42 21.0787C42 32.5618 32.5618 42 21.0787 42C9.4382 42 0 32.5618 0 21.0787C0 9.4382 9.4382 0 21.0787 0ZM18.8764 9.59551C18.8764 7.55056 22.0225 7.55056 22.0225 9.59551V20.764L29.2584 22.809C31.1461 23.4382 30.3596 26.427 28.3146 25.9551L20.1348 23.4382C19.3483 23.2809 18.8764 22.6517 18.8764 21.8652V9.59551ZM21.0787 3.14607C11.1685 3.14607 3.14607 11.1685 3.14607 21.0787C3.14607 30.8315 11.1685 38.8539 21.0787 38.8539C30.8315 38.8539 38.8539 30.8315 38.8539 21.0787C38.8539 11.1685 30.8315 3.14607 21.0787 3.14607Z" fill="#58588B"/>
      </svg>
      <svg v-else class="w-8 h-8"  viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.0787 0C32.5618 0 42 9.4382 42 21.0787C42 32.5618 32.5618 42 21.0787 42C9.4382 42 0 32.5618 0 21.0787C0 9.4382 9.4382 0 21.0787 0ZM18.8764 9.59551C18.8764 7.55056 22.0225 7.55056 22.0225 9.59551V20.764L29.2584 22.809C31.1461 23.4382 30.3596 26.427 28.3146 25.9551L20.1348 23.4382C19.3483 23.2809 18.8764 22.6517 18.8764 21.8652V9.59551ZM21.0787 3.14607C11.1685 3.14607 3.14607 11.1685 3.14607 21.0787C3.14607 30.8315 11.1685 38.8539 21.0787 38.8539C30.8315 38.8539 38.8539 30.8315 38.8539 21.0787C38.8539 11.1685 30.8315 3.14607 21.0787 3.14607Z" fill="#58588B"/>
      </svg>
      <h1 class="text-2xl text-title">Remotely</h1>
    </div>
    <h1 class="text-3xl text-title mt-24 mb-4">Cadastro</h1>
    <div class="w-11/12 sm:w-8/12 lg:w-6/12 px-6 sm:px-16">
      <form action="#" class="flex flex-col gap-1" autocomplete="off">
        <Input id="nameRegister" labelText="Nome" @getValue="(e) => this.currentUser.name = e" />
        <Input id="emailRegister" labelText="E-Mail" @getValue="(e) => this.currentUser.email = e" />
        <Input id="passwordRegister" type="password" labelText="Senha" @getValue="(e) => this.currentUser.password = e" />
        <Input id="confirmPasswordRegister" type="password" labelText="Confirmar Senha" @getValue="(e) => this.currentUser.password_confirmation = e" />
        <div class="flex items-center justify-center mt-3">
          <button
            class="mt-3 py-2 bg-primary text-white focus:outline-none rounded
              hover:opacity-70 w-7/12 border-none"
            type="submit"
            @click.prevent="handleSubmit()"
          >
          Registrar
          </button>
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
    <div
      v-if="status.length > 0"
      class="border rounded py-3 px-8 mt-6"
      :class="
        status[0] === 'success'
          ? 'bg-green-300 text-green-700 border-green-700'
          : status[0] === 'error'
          ? 'bg-red-300 text-red-700 border-red-700'
          : status[0] === 'warning'
          ? 'bg-yellow-300 text-yellow-700 border-yellow-700'
          : ''
      "
    >
      <span v-if="typeof status[1] === 'string'">
        {{ status[1] }}
      </span>
      <ul v-else class="list-inside">
        <li v-for="(stat, index) in status[1]" :key="index">
          {{ stat }}
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Input from "./Input";

export default {
  components: { Input },
  updated() {
    setTimeout(() => {
      this.$store.commit("resetStatus");
    }, 2500);
  },
  data() {
    return {
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
      )
        return alert("Todos os campos devem ser preenchidos");
      this.$store.dispatch("auth/signUp", this.currentUser).then((res) => {
        if (res.status === 201) this.sendToLogin();
      });
    },
    sendToLogin() {
      this.$router.push("/login");
    },
    sendToHome() {
      this.$router.push("/");
    }
  },
};
</script>