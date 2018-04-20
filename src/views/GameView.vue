<!--<template>
  <div class="game-view">
    <div class="game-wrapper">
      <iframe height="740"
              width="1120"
              src="./static/cocos/index.html">
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
</style>-->

<template> 
  <div class="game-view">
    <div class="columns">
      <div class="column">
        <ve-map height="100vh"
                :data="chartData"
                :legend-visible="legendVisible"
                :settings="chartSettings"
                :events="chartEvents"
                :extend="chartExtend"></ve-map>
      </div>
      <div class="tile is-parent">
        <div class="column">
          <!-- 城池属性界面，出现条件：点击左边一处地图 -->
          <article class="is-child notification is-primary" v-if="selectedcity">
            <div class="columns is-mobile">
              <div class="column has-text-left subtitle">
                城市
              </div>
              <div class="column has-text-right subtitle">
                {{selectedstatus.name}}<!--新野-->
              </div>
              <div class="column has-text-left subtitle">
                太守
              </div>
              <div class="column has-text-right subtitle">
                岛娘
              </div>
            </div>
            <div class="columns is-mobile">
              <div class="column has-text-left">
                兵力
              </div>
              <div class="column has-text-right">
                8000/20000
              </div>
              <div class="column has-text-left">
                兵力恢复
              </div>
              <div class="column has-text-right">
                80
              </div>
            </div>
            <div class="columns is-mobile">
              <div class="column has-text-left">
                武将
              </div>
              <div class="column has-text-right">
                5
              </div>
              <div class="column has-text-left">
                总统率力
              </div>
              <div class="column has-text-right">
                330
              </div>
            </div>
            <!-- <div class="columns is-mobile">
              <div class="column has-text-left">
                金
              </div>
              <div class="column has-text-right">
                1000
              </div>
              <div class="column has-text-left">
                粮
              </div>
              <div class="column has-text-right">
                20000
              </div>
            </div>
            <div class="columns is-mobile">
              <div class="column has-text-left">
                农业
              </div>
              <div class="column has-text-right">
                940/1000
              </div>
              <div class="column has-text-left">
                商业
              </div>
              <div class="column has-text-right">
                460/800
              </div>
            </div>
            <div class="columns is-mobile">
              <div class="column has-text-left">
                兵力
              </div>
              <div class="column has-text-right">
                10000
              </div>
            </div>
            </div>
            <div class="columns is-mobile">
              <div class="column has-text-left">
                城防
              </div>
              <div class="column has-text-right">
                1000/1000
              </div>
            </div> -->
          </article>
           <!-- 时局界面，出现条件：未选择任何地图，刚刚进入地图界面 -->
          <article class="is-child notification is-primary" v-else>
            <div class="columns is-mobile">
              <div class="column has-text-left subtitle">
                最大势力
              </div>
              <div class="column has-text-right subtitle">
                岛娘势力
              </div>
              <div class="column has-text-left subtitle">
                创建者
              </div>
              <!-- 可点 -->
              <div class="column has-text-right subtitle">
                0x123..
              </div>
            </div>
            <div class="columns is-mobile">
              <div class="column has-text-left">
                占领城池数
              </div>
              <div class="column has-text-right">
                14
              </div>
              <div class="column has-text-left">
                总武将数
              </div>
              <div class="column has-text-right">
                35
              </div>
            </div>
            <div class="column is-mobile">
              选中左边城市以参与战局！
            </div>
          </article>
          <!-- 操作界面 -->
          <!-- 主要作战界面，出现条件：选中地图，并且已经加入游戏，最主要的作战界面 -->
          <div v-if="selectedcity">
          <article class="is-child notification is-warning" v-if="isjoinedgame">
            <div class="columns is-mobile">
              <div class="column is-one-fifth"><a class="button">军事</a></div>
              <div class="column is-one-fifth"><a class="button">内政</a></div>
              <div class="column is-one-fifth"><a class="button">人事</a></div>
              <div class="column is-one-fifth"><a class="button">计谋</a></div>
              <div class="column is-one-fifth"><a class="button">外交</a></div>
              <!-- <a class="button">军事</a>
              <a class="button">内政</a>
              <a class="button">人事</a>
              <a class="button">计谋</a>
              <a class="button">外交</a> -->
            </div>
          </article>
          <!-- 加入战局界面，出现条件：选中地图，但未加入战局-->
          <article class="is-child notification is-warning" v-else>
            <div class="columns is-mobile">
              <div class="column"><a class="button" v-on:click="joingame">加入战局</a></div>
              <!-- <a class="button">军事</a>
              <a class="button">内政</a>
              <a class="button">人事</a>
              <a class="button">计谋</a>
              <a class="button">外交</a> -->
            </div>
          </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VeMap from "v-charts/lib/map";
export default {
  components: { VeMap },
  created() {
    this.chartData = {
      columns: ["位置", "势力", "兵力", "城防", "人口"],
      rows: [
        { 位置: "北平", 兵力: 11, 城防: 250, 势力: 999, 人口: 123 },
        { 位置: "襄平", 人口: 1223 },
        { 位置: "蓟", 人口: 321 },
        { 位置: "晋阳" },
        { 位置: "上党" },
        { 位置: "南皮" },
        { 位置: "兒" },
        { 位置: "北海" },
        { 位置: "陈留" },
        { 位置: "洛阳" },
        { 位置: "弘农" },
        { 位置: "长安" },
        { 位置: "天水" },
        { 位置: "武威" },
        { 位置: "酒泉" },
        { 位置: "下堰" },
        { 位置: "许昌" },
        { 位置: "寿春" },
        { 位置: "南阳" },
        { 位置: "襄阳" },
        { 位置: "长沙" },
        { 位置: "桂阳" },
        { 位置: "零陵" },
        { 位置: "建业" },
        { 位置: "会稽" },
        { 位置: "建安" },
        { 位置: "阜阳" },
        { 位置: "柴桑" },
        { 位置: "汉中" },
        { 位置: "武都" },
        { 位置: "永安" },
        { 位置: "江州" },
        { 位置: "成都" },
        { 位置: "朱提" },
        { 位置: "永昌" },
        { 位置: "建宁" },
        { 位置: "南海" },
        { 位置: "苍梧" },
        { 位置: "合浦" },
        { 位置: "郁林" },
        { 位置: "交趾" }
      ]
    };
    var theself = this;
    //----
    this.isjoinedgame = false;
    this.selectedcity = false;
    this.joingame = () => {
      this.isjoinedgame = true;
      theself.$forceUpdate();
    };
    this.selectedstatus = { name: "" };
    this.legendVisible = false;
    this.chartSettings = {
      positionJsonLink: "./static/gameGeo.json",
      position: "world",
      beforeRegisterMap(json) {
        return json;
      },
      selectedMode: "single",
      zoom: 1,
      roam: false,
      itemStyle: {
        normal: {
          borderColor: "rgba(0, 0, 0, 0.2)"
        },
        emphasis: {
          areaColor: null,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          borderWidth: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        },
        fighted: {
          areaColor: "rgba(255, 0, 0, 0.3)",
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          borderWidth: 0,
          shadowColor: "rgba(0, 0, 0, 0.2)"
        }
      }
    };
    this.chartExtend = {
      series: {
        showLegendSymbol: false,
        nameMap: {
          XiangPing: "襄平",
          BeiPing: "北平",
          Ji: "蓟",
          JinYang: "晋阳",
          ShangDang: "上党",
          NanPi: "南皮",
          Er: "兒",
          BeiHai: "北海",
          ChenLiu: "陈留",
          LuoYang: "洛阳",
          HongNong: "弘农",
          ChangAn: "长安",
          TianShui: "天水",
          WuWei: "武威",
          JiuQuan: "酒泉",
          XiaYan: "下堰",
          XuChang: "许昌",
          ShouChun: "寿春",
          NanYang: "南阳",
          XiangYang: "襄阳",
          ChangSha: "长沙",
          GuiYang: "桂阳",
          LingLing: "零陵",
          JianYe: "建业",
          KuaiJi: "会稽",
          JianAn: "建安",
          FuYang: "阜阳",
          ChaiSang: "柴桑",
          HanZhong: "汉中",
          WuDu: "武都",
          YongAn: "永安",
          JiangZhou: "江州",
          ChengDu: "成都",
          ZhuTi: "朱提",
          YongChang: "永昌",
          JianNing: "建宁",
          NanHai: "南海",
          CangWu: "苍梧",
          HePu: "合浦",
          YuLin: "郁林",
          JiaoZhi: "交趾"
        }
      }
    };
    this.chartEvents = {
      click(e) {
        theself.selectedstatus = e;
        if (e.name != "") theself.selectedcity = true;
        else theself.selectedcity = false;
        theself.$forceUpdate();
        console.log(e);
        console.log(this);
        console.log(theself);
      },
      mouseover(e) {
        console.log(e.name);
      }
    };
  }
};
</script>