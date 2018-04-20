<template>
  <div class="PackView is-marginless is-clipped">

    <section class="section1">
          <div class="sectionContainer">
              <div class="logo">
                  <img alt="" width="150" srcset="../assets/img/logo.png"/>
              </div>
              <div class="container">
                  <div>
                      <p class="title">以太三国</p>
                      <p class="subtitle">开启区块链大航海时代</p>
                  </div>
                  <br/>
                  <div class="btndiv">
                    <router-link class="button is-medium" :to="{ name: 'Game' }">进入游戏</router-link>
                    <!-- <a class="button is-medium" href="https://cryptosanguo.pro/#/game" target="_blank">进入游戏</a> -->
                  </div>
                  <div class="btndiv">
                    <router-link class="button is-medium" :to="{ name: 'PreSell' }">预售商城</router-link>
                  </div>
                  <div class="btndiv">
                    <!-- <a class="button is-medium" href="http://old.etherwarship.com" style="background-color: transparent; color:white" target="_blank">白皮书</a> -->
                    <router-link class="button is-medium" :to="{ name: 'BP' }" style="background-color: transparent; color:white">白皮书</router-link>
                  </div>
                  <br/>
                  <br/>
                  <br/>
              </div>
          </div>
    </section>

    <br/>

    <section>
      <Carousel :per-page="1"  :navigationEnabled="true" :paginationEnabled="false">
        <Slide>
          <div class="slide slide1">
                    <div class="slideContainer">
                        <span class="slidetext slidetitle">独创玩法</span>
                        <p class="slidetext" >独创玩法独创玩法独创玩法独创玩法独创玩法</p>
                    </div>
          </div>
        </Slide>
        <Slide>
          <div class="slide slide2">
                    <div class="slideContainer">
                        <span class="slidetext">独创玩法</span>
                        <p class="slidetext" >独创玩法独创玩法独创玩法独创玩法独创玩法</p>
                    </div>
          </div>
        </Slide>
        <Slide>
          <div class="slide slide3">
                    <div class="slideContainer">
                        <span class="slidetext">独创玩法</span>
                        <p class="slidetext" >独创玩法独创玩法独创玩法独创玩法独创玩法</p>
                    </div>
          </div>
        </Slide>
      </Carousel>
    </section>

  </div>
</template>

<script>

import { Carousel, Slide } from 'vue-carousel';
export default {
  components: {
    Carousel,
    Slide
  }
};

</script>

<style scoped>
.PackView {
  background-color: #000;
}

.logo {
  text-align: right;
  padding-right: 30px;
  padding-top: 30px;
}

.section1 {
  background-image: url("../assets/img/homeBG.jpeg");
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: #000;
}
.sectionContainer {
  background-color: #000;
  opacity: 0.7;
}
.title {
  font-size: 60px;
  color: #fff;
}
.subtitle {
  color: #fff;
}
.btndiv {
  margin-top: 20px;
  margin-bottom: 20px;
}

.slide {
  width: 100%;
  height: 50vw;
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: #000;
  display: inline-block;
  vertical-align: middle;
  padding-left: 30px;
}
.slide1 {
  background-image: url("../assets/img/home1.jpeg");
}
.slide2 {
  background-image: url("../assets/img/home2.jpeg");
}
.slide3 {
  background-image: url("../assets/img/home3.jpeg");
}
.slideContainer {
  margin-top: 55px;
  padding: 20px;
  width: 50%;
  height: 50%;
  background-color: #ffffff33;
  /*opacity: 0.5;*/
}
.slidetext {
  color: #000;
  font-size: 20px;
}
.slidetitle {
  font-size: 40px;
}

</style>
