<template>
  <div class="flex flex-col justify-center">
    <NavBar />
    <PageWrapper title="E-mail Verificado">
      <div class="px-8">
        E-mail verificado com sucesso!
        <p>Clique <a class="font-medium text-primary text-lg" href="" @click.prevent="sendToLogin">aqui</a> para fazer o login.</p>
      </div>
    </PageWrapper>
  </div>
</template>
<script>
import { mapState } from "vuex";
import NavBar from "./NavBar";
import PageWrapper from "./PageWrapper";
export default {
  components: { NavBar, PageWrapper },
  name: "EmailVerified",
  computed: {
    ...mapState(["status"]),
  },
  methods: {
    sendMailVerification() {
      this.$store.dispatch("auth/sendVerificationMail");
    },
    sendToLogin() {
      this.$router.push('/login');
    }
  },
};
</script>