<template>
  <select v-model="locale">
    <option v-for="(item) in $config.i18n"
            :key="item.locale"
            :value="item.locale">
      {{item.langDisplay}}</option>
  </select>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "I18nSwither",
  async created() {
    this.$store.dispatch("initLocale");
  },
  computed: {
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
        this.$store.dispatch("setLocale", value);
      }
    }
  },
  watch: {
    locale(val) {
      this.$i18n.locale = val;
    }
  }
};
</script>

<style>

</style>
