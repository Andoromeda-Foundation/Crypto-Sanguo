<template>
  <div class="game-view">
    <div class="game-wrapper">
      <iframe height="100%"
              width="100%"
              src="./static/cocos/index.html"
              scrolling=auto
              frameborder=0>
        <p>Your browser does not support iframes.</p>
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  created() {},
};
</script>

<style scoped>
.game-wrapper {
  height: 100vh;
}
</style>
