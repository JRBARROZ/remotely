<template>
  <div class="h-screen w-screen flex items-center justify-center">
    <span class="text-title text-xl dark:text-gray-200">Por favor, aguarde...</span>
  </div>
</template>
<script>
export default {
  mounted() {
    this.verifyEmail();
  },
  data() {
    return {
      email: ''
    }
  },
  methods: {
    verifyEmail() {
      this.email = this.$route.query.token;
      this.$store.dispatch('auth/verifyIfHasEmailValidated', this.email);
    }
  }
}
</script>