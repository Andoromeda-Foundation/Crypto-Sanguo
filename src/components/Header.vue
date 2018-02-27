<template>
  <header>
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <router-link class="navbar-item"
                     :to="{ name: 'Home'}">
          {{$t('header.nav.siteName')}}
        </router-link>

        <router-link class="navbar-item"
                     :to="{ name: 'Explore' }">
          {{$t('header.nav.explore')}}
        </router-link>

        <router-link v-if="!me"
                     class="navbar-item"
                     :to="{ name: 'Login'}">
          {{$t('header.nav.signIn')}}
        </router-link>

        <router-link v-else
                     class="navbar-item"
                     :to="{ name: 'User', params:{ address: me.address }}">
          {{$t('header.nav.myPage')}}
        </router-link>
      </div>

      <div class="navbar-end">

        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              {{network.name}}
            </p>
          </div>
        </div>

        <div class="navbar-item">
          <div class="field is-grouped">
            <div class="control">
              <div class="select">
                <I18nSwitcher />
              </div>
            </div>
          </div>
        </div>

      </div>

    </nav>
  </header>
</template>

<script>
import { mapState } from "vuex";
import { getNetwork, getAnnouncements } from "@/api";
import I18nSwitcher from "@/components/I18nSwitcher";

export default {
  name: "Header",
  components: {
    I18nSwitcher
  },
  data() {
    return {
      network: {}
    };
  },
  async created() {
    this.$store.dispatch("FETCH_ME");
    const network = await getNetwork();
    if (!network) {
      alert("Unknown network!");
      return;
    }
    this.network = network;
    if (!network.contract) {
      alert(`Unsupported ${network.name}`);
    }
  },
  computed: {
    ...mapState(["me"])
  },
  watch: {}
};
</script>

<style>

</style>
