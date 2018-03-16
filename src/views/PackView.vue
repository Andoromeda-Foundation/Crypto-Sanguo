<template>
  <div class="PackView is-marginless is-clipped">

    <section class="KJ-position-relative has-text-centered">
      <img src="@/assets/img/packBg.png" />
      <div class="KJ-position-absolute-horizontal-center"
           style="bottom:5%">
        <div class="remainingCards-msg mainTextColor
        KJ-position-relative">卡包剩余：8张卡牌</div>
        <div class="KJ-position-relative KJ-cursor-pointer">
          <img style="width:82%"
               src="@/assets/img/button_chouka.png" />
          <span class="drawCard-btn-text mainTextColor
           KJ-position-absolute-horizontal-center has-text-weight-bold">
            立即抽卡</span>
        </div>
      </div>
    </section>

    <section class="help-msg">
      <h3>帮助:</h3>
      <p>帮助文字风飒风帮助文字风飒风帮助文字风飒风帮助文字风飒风</p>
      <p>帮助文字风飒风帮助文字风飒风帮助文字风飒风帮助文字风飒风</p>
    </section>

    <section>
      <b-tabs position="is-centered"
              class="block PackView-tabs">
        <b-tab-item label="所有卡牌">
          所有卡牌
        </b-tab-item>
        <b-tab-item label="卡牌广播">
          卡牌广播
        </b-tab-item>
        <b-tab-item label="我的Token">
          我的Token
        </b-tab-item>
      </b-tabs>
    </section>

  </div>
</template>

<script>
export default {
  name: 'PackView',
  created() {},
  methods: {},
};
</script>
<style lang="postcss" scoped>
.PackView {
  --paddingY: 18vw;
  --fontSize: 1vw;

  background-image: url("../assets/img/packViewBg.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: #000;
  padding: 3% var(--paddingY) 5% var(--paddingY);
  font-size: var(--fontSize);
  @media (max-width: 800px) {
    --scale: 1.4;
    padding: 3% calc(var(--paddingY) * (var(--scale) -1)) 5%
      calc(var(--paddingY) * (var(--scale) -1));
    font-size: calc(var(--fontSize)* var(--scale));
  }
}
.mainTextColor {
  color: #fbb800;
}
.remainingCards-msg {
  font-size: 1.5em;
  bottom: -1.7em;
}
.drawCard-btn-text {
  font-size: 2em;
  bottom: 33%;
}
.help-msg {
  font-size: 1.1em;
  color: #eed9b2;
  padding: 2em 1.4em;
}
</style>
