<template>
  <div class="flex flex-col justify-center">
    <NavBar />
    <PageWrapper title="Verifique Seu E-mail">
      <div class="px-8">
        <p class="text-base mt-7">
          Você precisa validar seu e-mail antes de começar a usar o REMOTELY.<br>
        </p>
        <p class="text-base mt-7">
          Não recebeu o e-mail de validação?
          <a href="#" @click.prevent="sendMailVerification()" class="text-blue-400 font-semibold">
            Clique aqui</a> para enviarmos novamente
        </p>
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
  name: "VerifyEmail",
  computed: {
    ...mapState(["status"]),
  },
  methods: {
    sendMailVerification() {
      this.$store.dispatch("auth/resendVerificationEmail");
    },
  },
};
</script>