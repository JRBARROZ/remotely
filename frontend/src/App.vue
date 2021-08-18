<template>
  <div class="relative">
    <Menu :logout=logout v-if="Object.keys(loggedUser).length > 0" />
    <router-view />
  </div>
  
</template>

<script>
import { mapState } from 'vuex';
import Menu from '@/components/Menu';

export default {
  components: {
    Menu
  },
  computed: {
    ...mapState('auth', {loggedUser: state => state.loggedUser}),
    ...mapState(['emailValidated'])
  },
  mounted() {
    if (Object.keys(this.loggedUser).length === 0) {
      return;
    }
    this.$store.dispatch('auth/userRequest');
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      .then(() => {
        this.$router.push('/login');
      });
    },
  }
}
</script>

<style lang="scss">
</style>
