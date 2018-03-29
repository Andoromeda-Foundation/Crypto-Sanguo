<template>
  <header class="[$route.name === 'Home' ? 'sig-home-header' : '']">
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link class="navbar-item"
                     :to="{ name: 'Home'}">
          {{$t('header.nav.siteName')}}
        </router-link>

        <router-link v-if="!me"
                     class="navbar-item"
                     :to="{ name: 'Login'}">
          {{$t('header.nav.SignIn')}}
        </router-link>

        <template v-else>
          <!-- <router-link class="navbar-item"
                       :to="{ name: 'Game' }">
            {{$t('header.nav.game')}}
          </router-link> -->

          <router-link class="navbar-item"
                       :to="{ name: 'User', params:{address: me.address}}">
            {{$t('header.nav.myPage')}}
          </router-link>

          <!-- <router-link class="navbar-item"
                       :to="{ name: 'Transaction', params:{address: me.address}}">
            {{$t('header.nav.Transactions')}}
          </router-link> -->

          <!-- <router-link class="navbar-item"
                       :to="{ name: 'Explore' }">
            {{$t('header.nav.explore')}}
          </router-link> -->

          <router-link class="navbar-item"
                       :to="{ name: 'HeroList' }">
            {{$t('header.nav.herolist')}}
          </router-link>
        </template>

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
import { getNetwork } from '@/api';
import I18nSwitcher from '@/components/I18nSwitcher';

export default {
  name: 'Header',
  components: {
    I18nSwitcher,
  },
  data() {
    return {
      network: {},
    };
  },
  async created() {
    this.$store.dispatch('FETCH_ME');
    const network = await getNetwork();
    if (!network) {
      alert('Unknown network!');
      return;
    }
    this.network = network;
    if (!network.contract) {
      alert(`Unsupported ${network.name}`);
    }
  },
  computed: {
    locale: {
      get() {
        const locale = this.$store.state.locale;
        const i18n = this.$config ? this.$config.i18n : [];
        const lang = i18n.find(
          item =>
            item.locale === locale ||
            item.aliases.some(alias => alias === locale),
        );
        return lang ? lang.locale : null;
      },
      set(value) {
        this.$store.dispatch('setLocale', value);
      },
    },
    me() {
      return this.$store.state.me;
    },
  },
  methods: {
    onCloseInfo() {
      this.isShowInfo = false;
    },
  },
  watch: {
    locale(val) {
      this.$i18n.locale = val;
    },
  },
};
</script>

<style scoped>
.notification {
  margin-bottom: 0;
  font-size: 0.8rem;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
}
header {
  position: relative;
}
.navbar {
  background: rgba(0, 0, 0, 0.5);
  /* position: absolute; */
  top: 0;
  left: 0;
  right: 0;
}
/* .sig-home-header .navbar {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
} */

.navbar-item {
  font-weight: 700;
  padding: 0.7rem 2rem;
  /* margin: 0.5rem 2rem; */
  font-size: 1.14rem;
  color: #fff;
}
a.navbar-item:hover {
  color: #fdda46 !important;
  background-color: transparent !important;
}
</style>
