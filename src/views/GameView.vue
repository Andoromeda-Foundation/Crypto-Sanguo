<template>
  <div class="game-view">
    <div class="columns">
      <div class="column ">
        <ve-map height="100vh"
                :data="chartData"
                :settings="chartSettings"
                :extend="chartExtend"></ve-map>
      </div>
      <div class="column">
        UI
      </div>
    </div>
  </div>
</template>

<script>
import VeMap from "v-charts/lib/map";
export default {
  components: { VeMap },

  created: function() {
    this.chartData = {
      columns: ["位置", " 人口"],
      rows: [{ 位置: "蜀国", " 人口": 123 }]
    };
    this.chartSettings = {
      positionJsonLink: "./static/gameGeo.json",
      position: "world",
      beforeRegisterMap(json) {
        return json;
      },
      zoom: 1,
      roam: true
    };
    this.chartExtend = {
      series: {
        nameMap: {
          SHU: "蜀国"
        }
      }
    };
  }
};
</script>