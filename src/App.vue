<template>
  <div id="app">
    <Header />
    <router-view class="view"
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

<style>
.view {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
@media screen and (max-width: 768px) {
  .view {
    margin-left: 1rem;
    margin-right: 1rem;
  }
}

/* KJ CSS Utilities */

.KJ-position-absolute-horizontal-center {
  position: absolute !important;
  left: 50%;
  transform: translateX(-50%);
}
.KJ-position-absolute-vertical-center {
  position: absolute !important;
  top: 50%;
  transform: translateY(-50%);
}
.KJ-position-relative {
  position: relative !important;
}
.KJ-position-absolute {
  position: absolute !important;
}
.KJ-left-0 {
  left: 0;
}
.KJ-right-0 {
  right: 0;
}
.KJ-margin-auto {
  margin: auto;
}
.KJ-cursor-pointer {
  cursor: pointer;
}
.KJ-width-100 {
  width: 100%;
}

/* Overwrite PackView tabs style */

.PackView-tabs .tabs {
  display: flex;
}
.PackView-tabs .tabs ul {
  border: none;
}
.PackView-tabs .tabs li {
  background-image: url("./assets/img/button_def.png");
  background-repeat: no-repeat;
  background-size: cover;
  flex-grow: 1;
}
.PackView-tabs .tabs a {
  border: none !important;
}
.PackView-tabs .tabs li.is-active {
  background-image: url("./assets/img/button_seleted.png");
}
.PackView-tabs .tabs {
  font-size: inherit;
}
.PackView-tabs .tabs li span {
  font-size: 1.9em;
  color: white;
  font-weight: 600;
  line-height: 2em;
}
.PackView-tabs .tab-content {
  margin-top: 20px;
  background-image: url("./assets/img/packViewTabContentBg.jpg");
  background-size: cover;
  /* height: 100vh; */
  /* overflow: scroll; */
  border: 1px solid #8c9399;
}
</style>
