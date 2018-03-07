<template>

  <div>
    <h2 class="title">{{hero.姓名}}</h2>
    <div>
      <img id="image" v-bind:src="'static/heroes/'+hero.image_name"></img>
      <div id="chart"></div>
    </div>
    <br />
    <h2 class="title">个人</h2>
      <h5>性格：{{hero.性格}}</h5>
      <h5>性别：{{hero.性别}}</h5>
      <h5>出身：{{hero.出身}}</h5>
      <h5>势力：{{hero.势力}}</h5>
      <h5>特技：{{hero.特技}}</h5>
      <h5>生平：{{hero.生平}}</h5>
    <br />
    <h2 class="title">兵种属性</h2>
      <h5>枪兵：{{hero.枪兵}}</h5>
      <h5>戬兵：{{hero.戬兵}}</h5>
      <h5>弩兵：{{hero.弩兵}}</h5>
      <h5>骑兵：{{hero.骑兵}}</h5>
      <h5>武器：{{hero.武器}}</h5>
      <h5>水军：{{hero.水军}}</h5>
  </div>

</template>

<script>
import echarts from 'echarts';

export default {
    name: 'HeroDetailView',
    data () {
      return {
        hero:[],
        chart: null
      }
    },
    mounted() {
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.showHero(to.params.id);
      })
    },
    methods: {
      showHero(id) {
        this.$http.get('static/heroes.json').then((response) => {
          this.hero = response.body[id];
          this.setupEChart();
        });
      },
      
      setupEChart() {
          this.chart = echarts.init(document.getElementById("chart"))
          this.chart.showLoading()
          this.chart.setOption({
              polar: [{
                  indicator: [
                      {
                          text: "统御",
                          max: 300,
                          min: 0,
                      },
                      {
                          text: "武力",
                          max: 300,
                          min: 0
                      },
                      {
                          text: "智力",
                          max: 300,
                          min: 0
                      },
                      {
                          text: "政治",
                          max: 300,
                          min: 0
                      },
                      {
                          text: "魅力",
                          max: 300,
                          min: 0
                      },
                      {
                          text: "统武和",
                          max: 300,
                          min: 0
                      },
                      {
                          text: "统武智和",
                          max: 300,
                          min: 0
                      }
                  ]
              }],
              calculable: true,
              series: [{
                  type: 'radar',
                  calculable: true,
                  data: [{
                    value: [this.hero.统御, this.hero.武力, this.hero.智力, this.hero.政治, this.hero.魅力, this.hero.统武和, this.hero.统武智和],
                    name: "预算分配"
                  }]
              }]
          })
          this.chart.hideLoading()
      }
    },
    watch: {
    }
};
</script>

<style scoped>
#image{
  position: absolute;
}

#chart{
  height: 300px;
}
</style>