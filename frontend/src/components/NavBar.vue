<template>
  <div class="w-full font-comfoorta">
    <div class="flex items-center justify-center gap-2 md:hidden pt-6 md:mt-0">
      <router-link to="/" class="flex items-center gap-2">
        <svg
          class="w-8 h-8"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            v-if="this.theme === 'light'"
            d="M21.0787 0C32.5618 0 42 9.4382 42 21.0787C42 32.5618 32.5618 42 21.0787 42C9.4382 42 0 32.5618 0 21.0787C0 9.4382 9.4382 0 21.0787 0ZM18.8764 9.59551C18.8764 7.55056 22.0225 7.55056 22.0225 9.59551V20.764L29.2584 22.809C31.1461 23.4382 30.3596 26.427 28.3146 25.9551L20.1348 23.4382C19.3483 23.2809 18.8764 22.6517 18.8764 21.8652V9.59551ZM21.0787 3.14607C11.1685 3.14607 3.14607 11.1685 3.14607 21.0787C3.14607 30.8315 11.1685 38.8539 21.0787 38.8539C30.8315 38.8539 38.8539 30.8315 38.8539 21.0787C38.8539 11.1685 30.8315 3.14607 21.0787 3.14607Z"
            fill="#58588B"
          />
          <path
            v-else
            d="M21.0787 0C32.5618 0 42 9.4382 42 21.0787C42 32.5618 32.5618 42 21.0787 42C9.4382 42 0 32.5618 0 21.0787C0 9.4382 9.4382 0 21.0787 0ZM18.8764 9.59551C18.8764 7.55056 22.0225 7.55056 22.0225 9.59551V20.764L29.2584 22.809C31.1461 23.4382 30.3596 26.427 28.3146 25.9551L20.1348 23.4382C19.3483 23.2809 18.8764 22.6517 18.8764 21.8652V9.59551ZM21.0787 3.14607C11.1685 3.14607 3.14607 11.1685 3.14607 21.0787C3.14607 30.8315 11.1685 38.8539 21.0787 38.8539C30.8315 38.8539 38.8539 30.8315 38.8539 21.0787C38.8539 11.1685 30.8315 3.14607 21.0787 3.14607Z"
            fill="#E5E7EB"
          />
        </svg>
        <h1 class="text-2xl text-title dark:text-gray-200">Remotely</h1>
        <div
          class="ml-4 absolute right-10 cursor-pointer h-8 w-8 flex items-center justify-center"
          @click.prevent="handleClick">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 transition-all duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            v-if="this.theme === 'light'"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 transition-all duration-300"
            fill="none"
						v-else
            viewBox="0 0 24 24"
            stroke="#FFF"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </div>
      </router-link>
    </div>
    <div
      class="md:flex items-center justify-between px-8 h-16 bg-primary w-full hidden dark:bg-dark-light"
    >
      <div
        class="ml-4 absolute top-20 z-10 right-10 cursor-pointer h-8 w-8 flex items-center
          justify-center"
        @click.prevent="handleClick">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 transition-all duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          v-if="this.theme === 'light'"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 transition-all duration-300"
          fill="none"
          v-else
          viewBox="0 0 24 24"
          stroke="#FFF"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </div>
      <div class="flex items-center gap-2">
        <router-link to="/" class="flex items-center gap-2">
          <svg
            class="w-6 h-6"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.0787 0C32.5618 0 42 9.4382 42 21.0787C42 32.5618 32.5618 42 21.0787 42C9.4382 42 0 32.5618 0 21.0787C0 9.4382 9.4382 0 21.0787 0ZM18.8764 9.59551C18.8764 7.55056 22.0225 7.55056 22.0225 9.59551V20.764L29.2584 22.809C31.1461 23.4382 30.3596 26.427 28.3146 25.9551L20.1348 23.4382C19.3483 23.2809 18.8764 22.6517 18.8764 21.8652V9.59551ZM21.0787 3.14607C11.1685 3.14607 3.14607 11.1685 3.14607 21.0787C3.14607 30.8315 11.1685 38.8539 21.0787 38.8539C30.8315 38.8539 38.8539 30.8315 38.8539 21.0787C38.8539 11.1685 30.8315 3.14607 21.0787 3.14607Z"
              fill="#fff"
            />
          </svg>
          <h1 class="text-2xl text-white">Remotely</h1>
        </router-link>
      </div>
      <router-link
        to="/"
        class="flex items-center gap-2"
        v-slot="{ isActive }"
        v-if="Object.keys(this.loggedUser).length > 0"
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 25V16.1765H15V25H21.25V13.2353H25L12.5 0L0 13.2353H3.75V25H10Z"
            fill="#EFEEFD"
            fill-opacity="0.6"
          />
        </svg>
        <h1
          :class="isActive ? 'text-opacity-100' : 'text-opacity-60'"
          class="lg:text-lg text-white"
        >
          Início
        </h1>
      </router-link>
      <router-link
        to="/organizations"
        class="flex items-center gap-2"
        v-slot="{ isActive }"
        v-if="Object.keys(this.loggedUser).length > 0"
      >
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5.55556V0H0V25H24V5.55556H12ZM4.8 22.2222H2.4V19.4444H4.8V22.2222ZM4.8 16.6667H2.4V13.8889H4.8V16.6667ZM4.8 11.1111H2.4V8.33333H4.8V11.1111ZM4.8 5.55556H2.4V2.77778H4.8V5.55556ZM9.6 22.2222H7.2V19.4444H9.6V22.2222ZM9.6 16.6667H7.2V13.8889H9.6V16.6667ZM9.6 11.1111H7.2V8.33333H9.6V11.1111ZM9.6 5.55556H7.2V2.77778H9.6V5.55556ZM21.6 22.2222H12V19.4444H14.4V16.6667H12V13.8889H14.4V11.1111H12V8.33333H21.6V22.2222ZM19.2 11.1111H16.8V13.8889H19.2V11.1111ZM19.2 16.6667H16.8V19.4444H19.2V16.6667Z"
            fill="white"
            :fill-opacity="this.isOrganization ? '1' : '0.6'"
          />
        </svg>
        <h1
          :class="
            isActive || this.isOrganization
              ? 'text-opacity-100'
              : 'text-opacity-60'
          "
          class="lg:text-lg text-white"
        >
          Organizações
        </h1>
      </router-link>
      <router-link
        to="/projects"
        class="flex items-center gap-2"
        v-slot="{ isActive }"
        v-if="Object.keys(this.loggedUser).length > 0"
      >
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 17.5H18V20H6V17.5ZM6 12.5H18V15H6V12.5ZM15 0H3C1.35 0 0 1.125 0 2.5V22.5C0 23.875 1.335 25 2.985 25H21C22.65 25 24 23.875 24 22.5V7.5L15 0ZM21 22.5H3V2.5H13.5V8.75H21V22.5Z"
            fill="#EFEEFD"
            :fill-opacity="this.isProject ? '1' : '0.6'"
          />
        </svg>
        <h1
          :class="
            isActive || this.isProject ? 'text-opacity-100' : 'text-opacity-60'
          "
          class="lg:text-lg text-white"
        >
          Projetos
        </h1>
      </router-link>
      <router-link
        to="/profile"
        class="flex items-center gap-2"
        v-slot="{ isActive }"
        v-if="Object.keys(this.loggedUser).length > 0"
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 0C5.6 0 0 5.6 0 12.5C0 19.4 5.6 25 12.5 25C19.4 25 25 19.4 25 12.5C25 5.6 19.4 0 12.5 0ZM6.3375 20.35C6.875 19.225 10.15 18.125 12.5 18.125C14.85 18.125 18.1375 19.225 18.6625 20.35C16.9625 21.7 14.825 22.5 12.5 22.5C10.175 22.5 8.0375 21.7 6.3375 20.35ZM20.45 18.5375C18.6625 16.3625 14.325 15.625 12.5 15.625C10.675 15.625 6.3375 16.3625 4.55 18.5375C3.275 16.8625 2.5 14.775 2.5 12.5C2.5 6.9875 6.9875 2.5 12.5 2.5C18.0125 2.5 22.5 6.9875 22.5 12.5C22.5 14.775 21.725 16.8625 20.45 18.5375ZM12.5 5C10.075 5 8.125 6.95 8.125 9.375C8.125 11.8 10.075 13.75 12.5 13.75C14.925 13.75 16.875 11.8 16.875 9.375C16.875 6.95 14.925 5 12.5 5ZM12.5 11.25C11.4625 11.25 10.625 10.4125 10.625 9.375C10.625 8.3375 11.4625 7.5 12.5 7.5C13.5375 7.5 14.375 8.3375 14.375 9.375C14.375 10.4125 13.5375 11.25 12.5 11.25Z"
            fill="#EFEEFD"
            fill-opacity="0.6"
          />
        </svg>
        <h1
          :class="isActive ? 'text-opacity-100' : 'text-opacity-60'"
          class="lg:text-lg text-white"
        >
          Perfil
        </h1>
      </router-link>
      <a
        href="#"
        @click.prevent="logout"
        class="flex items-center gap-2"
        v-if="Object.keys(this.loggedUser).length > 0"
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="cursor-pointer"
        >
          <path
            d="M17 8L15.59 9.41L17.17 11H9V13H17.17L15.59 14.58L17 16L21 12L17 8ZM5 5H12V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H12V19H5V5Z"
            fill="#EFEEFD"
            fill-opacity="0.6"
          />
        </svg>
        <h1
          :class="isActive ? 'text-opacity-100' : 'text-opacity-60'"
          class="lg:text-lg text-white"
        >
          Sair
        </h1>
      </a>
      <div v-else class="flex items-center gap-8">
        <router-link
          to="/register"
          class="flex items-center gap-2"
          v-slot="{ isActive }"
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 12C17.21 12 19 10.21 19 8C19 5.79 17.21 4 15 4C12.79 4 11 5.79 11 8C11 10.21 12.79 12 15 12ZM15 6C16.1 6 17 6.9 17 8C17 9.1 16.1 10 15 10C13.9 10 13 9.1 13 8C13 6.9 13.9 6 15 6ZM15 14C12.33 14 7 15.34 7 18V20H23V18C23 15.34 17.67 14 15 14ZM9 18C9.22 17.28 12.31 16 15 16C17.7 16 20.8 17.29 21 18H9ZM6 15V12H9V10H6V7H4V10H1V12H4V15H6Z"
              fill="#EFEEFD"
              fill-opacity="0.6"
            />
          </svg>
          <h1
            :class="isActive ? 'text-opacity-100' : 'text-opacity-60'"
            class="lg:text-lg text-white"
          >
            Cadastro
          </h1>
        </router-link>
        <router-link
          to="/login"
          class="flex items-center gap-2"
          v-slot="{ isActive }"
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 7L9.6 8.4L12.2 11H2V13H12.2L9.6 15.6L11 17L16 12L11 7ZM20 19H12V21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3H12V5H20V19Z"
              fill="#EFEEFD"
              fill-opacity="0.6"
            />
          </svg>
          <h1
            :class="isActive ? 'text-opacity-100' : 'text-opacity-60'"
            class="lg:text-lg text-white dark:text-white"
          >
            Entrar
          </h1>
        </router-link>
      </div>
      <router-link to="/" class="flex items-center gap-2 md:hidden">
        <svg
          class="w-8 h-8"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.0787 0C32.5618 0 42 9.4382 42 21.0787C42 32.5618 32.5618 42 21.0787 42C9.4382 42 0 32.5618 0 21.0787C0 9.4382 9.4382 0 21.0787 0ZM18.8764 9.59551C18.8764 7.55056 22.0225 7.55056 22.0225 9.59551V20.764L29.2584 22.809C31.1461 23.4382 30.3596 26.427 28.3146 25.9551L20.1348 23.4382C19.3483 23.2809 18.8764 22.6517 18.8764 21.8652V9.59551ZM21.0787 3.14607C11.1685 3.14607 3.14607 11.1685 3.14607 21.0787C3.14607 30.8315 11.1685 38.8539 21.0787 38.8539C30.8315 38.8539 38.8539 30.8315 38.8539 21.0787C38.8539 11.1685 30.8315 3.14607 21.0787 3.14607Z"
            fill="#58588B"
          />
        </svg>
        <h1 class="text-2xl text-title">Remotely</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </router-link>
      <router-view />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isActive: this.$router.isActive,
    };
  },
  props: {
    isProject: {
      type: Boolean,
      default: false,
    },
    isOrganization: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState("auth", { loggedUser: (state) => state.loggedUser }),
    ...mapState(["theme"]),
  },
  methods: {
    handleClick() {
      this.$store.commit("setTheme");
    },
    logout() {
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.push("/login");
      });
    },
    setOrgActive() {
      this.orgIsActive = true;
    },
    setProjActive() {
      this.projIsActive = true;
    },
  },
};
</script>