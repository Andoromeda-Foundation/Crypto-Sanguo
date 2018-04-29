<template lang="pug">
  header(class="[$route.name === 'Home' ? 'sig-home-header' : '']")
    nav.navbar
      .navbar-brand
        // 路人menu，直接用v-for循环数组，避免写入太多标签
        router-link(v-for="menu in menus" :key="menu" class="navbar-item"
                     :to="menu.to"
                     :style="navItemFontSize")
          |{{$t(menu.name)}}

        template(v-if="me")
          router-link(class="navbar-item"
                       :to="{ name: 'Game' }"
                     :style="navItemFontSize")
            |{{$t('header.nav.game')}}
          router-link(class="navbar-item"
                       :to="{ name: 'Transaction', params:{address: me.address} }"
                     :style="navItemFontSize")
            |{{$t('header.nav.Transactions')}}

      .navbar-end
        router-link(v-if="!me" :to="{ name: 'Login'}" class="navbar-item")
          |{{$t('header.nav.SignIn')}}

        template(v-else)
          router-link(class="navbar-item"
                       :to="{ name: 'User', params:{address: me.address}}"
                     :style="navItemFontSize")
            img(:src="getAvatar" class="avatar")
            span.info
              p|{{getBalance}} ETH
              p|{{getNetwork}}


        .navbar-item
          field(class='is-grouped')
            .control
              .select
                I18nSwitcher


</template>


<script>
import { getNetwork, getMe } from '@/api';
import Dravatar from 'dravatar';
import I18nSwitcher from '@/components/I18nSwitcher';

export default {
  name: 'Header',
  asyncComputed: {
    async getAvatar() {
      const uri = await Dravatar(this.me.address);
      return uri;
    }
  },
  components: {
    I18nSwitcher
  },
  data() {
    return {
      network: {}
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
    this.getMe = await getMe();
  },
  computed: {
    menus() {
      return [
        {
          name: 'header.nav.siteName',
          to: { name: 'Home' }
        },
        {
          name: 'header.nav.preSale',
          to: { name: 'PreSale' }
        }, {
          name: 'header.nav.explore',
          to: { name: 'Explore' }
        }, {
          name: 'header.nav.herolist',
          to: {
            name: 'HeroList'
          }
        }
      ];
    },
    navItemFontSize() {
      return {
        'font-size':
          this.$store.state.locale === 'en' ? `${0.8}rem` : `${1.14}rem`
      };
    },
    locale: {
      get() {
        const locale = this.$store.state.locale;
        const i18n = this.$config ? this.$config.i18n : [];
        const lang = i18n.find(
          item =>
            item.locale === locale ||
            item.aliases.some(alias => alias === locale)
        );
        return lang ? lang.locale : null;
      },
      set(value) {
        this.$store.dispatch('setLocale', value);
      }
    },
    me() {
      return this.$store.state.me;
    },
    getBalance() {
      const weiToEth = wei => wei / 1000000000000000000;
      return weiToEth(this.me.balance).toFixed(2);
    },
    getNetwork() {
      return this.network.name;
    }
  },
  methods: {
    onCloseInfo() {
      this.isShowInfo = false;
    }
  },
  watch: {
    locale(val) {
      this.$i18n.locale = val;
    }
  }
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
  background-color: #000000;
  /*background: none;
  position: absolute; */
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
.avatar {
  border-radius: 100%;
  margin-right: 8px;
  max-height: 2.9rem;
}
</style>
