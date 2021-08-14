<template>
  <div class="h-screen w-screen flex items-center justify-center">
    Please wait...
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