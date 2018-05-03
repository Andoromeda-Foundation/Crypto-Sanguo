import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { i18n } from '@/config';

Vue.use(VueI18n);

const messages = {};

i18n.forEach((item) => {
  // eslint-disable-next-line
  let locale = require(`./locales/${item.locale}`);
  locale = locale.default;
  item.aliases.forEach((alias) => {
    messages[alias] = locale;
  });
});

export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
});
