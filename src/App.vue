<template>
  <div id="app">
    <Header />

    <router-view class="container view"
                 :key="key"></router-view>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + +new Date()
        : this.$route + +new Date();
    },
  },
};
</script>

<style scoped>
.view {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
