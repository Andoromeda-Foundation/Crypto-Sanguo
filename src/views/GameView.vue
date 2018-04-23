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
          <article class="is-child notification is-primary" v-if="isselectedcity">
            <div class="columns is-mobile">
              <div class="column has-text-left subtitle">
                城市
              </div>
              <div class="column has-text-right subtitle">
                {{selectedstatus.位置}}<!--新野-->
              </div>
              <div class="column has-text-left subtitle">
                太守
              </div>
              <div class="column has-text-right subtitle">
                {{selectedstatus.势力}}
              </div>
            </div>
            <div class="columns is-mobile">
              <div class="column has-text-left">
                兵力
              </div>
              <div class="column has-text-right">
                {{selectedstatus.兵力}}
              </div>
              <div class="column has-text-left">
                兵力恢复
              </div>
              <div class="column has-text-right">
                {{selectedstatus.兵力恢复}}
              </div>
            </div>
            <div class="columns is-mobile">
              <div class="column has-text-left">
                武将数
              </div>
              <div class="column has-text-right">
                {{selectedstatus.武将数}}
              </div>
              <div class="column has-text-left">
                总统率力
              </div>
              <div class="column has-text-right">
                {{selectedstatus.总统率力}}
              </div>
            </div>
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
          <!-- 武将界面 -->
          <article class="is-child notification">
            <div class="columns is-mobile">
              <div v-if="cityisoccupied()">
                <div>
                  城池武将：
                </div>
                <div v-for="hero in selectedstatus.武将">
                  {{hero.name}} {{hero.attack}}
                </div>
              </div>
              <div v-else>
                <div>
                  我的武将：
                </div>
                <div v-if="isselectedcity">
                  <div v-for="hero in playerheros">
                    <input type="checkbox" v-model="hero.selected">
                      {{hero.name}}
                    </input>  
                    {{hero.attack}}
                    {{hero.city}}
                  </div>
                </div>
                <div v-else>
                  <div v-for="hero in playerheros">
                    {{hero.name}}  {{hero.attack}} {{hero.city}}
                  </div>
                </div>
              </div>
            </div>
          </article>
          <!-- 操作界面 -->
          <!-- 主要作战界面，出现条件：选中地图，并且已经加入游戏，最主要的作战界面 -->
          <div v-if="isselectedcity">
          <article class="is-child notification is-warning" v-if="cityisoccupied()">
            <div class="columns is-mobile">
              <div class="column is-one-fifth"><a class="button">出征</a></div>
              <div class="column is-one-fifth"><a class="button">撤退</a></div>
              <div class="column is-one-fifth"><a class="button">调度</a></div>
              <div class="column is-one-fifth"><a class="button">移动</a></div>
              <div class="column is-one-fifth"><a class="button">搜寻</a></div>
            </div>
          </article>
          <!-- 加入战局界面，出现条件：选中地图，但未加入战局-->
          <article class="is-child notification is-warning" v-else>
            <div class="columns is-mobile">
              <div class="column"><a class="button" v-on:click="occupy">占领城池</a></div>
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
      columns: ["位置", "势力", "兵力", "兵力恢复", "武将数", "总统率力"],
      rows: [
        { 位置: "北平",  势力: "0x123", 兵力: 11, 兵力恢复: 250, 人口: 123, color:"#FFB03A", 武将数:2, 总统率力:11, 武将: [{name:"张飞", attack:11},{name :"赵云"}],},
        { 位置: "襄平", 势力: "0x123", color:"#FFB03A" },
        { 位置: "蓟",  势力: "0x321", color:"#BFFF3A" },
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
    var theself = this; //用于在函数内取得this的属性

    //###########后端交互相关###########
    this.msgsender = "0x123";
    this.msgcolor = "#FFB03A";
    this.playerheros = [{name:"马超",attack:10},{name:"诸葛亮"}];
    //上面会在playerheros加一个selected，默认为false，后端万一出错再改
    //下面会在playerheros加一个city，代表已经加入战场
    //###########后端交互相关###########

    this.getdata = (name) => {  //取得rows里的元素
      for(var i=0;i<this.chartData.rows.length;i++){
          if (name == this.chartData.rows[i].位置){
            return theself.chartData.rows[i];
          }
      }
    }
    this.isselectedcity = false; // 是否选择城市
    this.cityisoccupied = () => { //城池是否有人占领
      if (!theself.isselectedcity) return false;
      return (theself.selectedstatus.势力 != null);
    };
    this.occupy = () => {//占领城池
      if (!theself.isselectedcity) return;
      if (theself.selectedstatus.势力 != null) return;
      //把选中的武将装进去
      var isselectedheros = false;
      var heroamount = 0;
      var allattacks = 0;
      var heros = [];
      var hero = {};
      for(var i=0;i<theself.playerheros.length;i++){
        hero = theself.playerheros[i];
        if (hero.city != null) continue;
        if (hero.selected){
          heros.push(theself.playerheros[i]);
          heroamount += 1;
          allattacks += hero.attack;
          isselectedheros = true;
          hero.city = theself.selectedstatus.位置;
        }
        hero.selected = false;
      }
      if (!isselectedheros) return;//未选中至少一个武将，返回
      theself.selectedstatus.势力 = theself.msgsender;
      theself.selectedstatus.color = theself.msgcolor;
      theself.selectedstatus.武将数 = heroamount;
      theself.selectedstatus.武将 = heros;
      theself.selectedstatus.总统率力 = allattacks;
      theself.$forceUpdate();
    }
    this.selectedstatus = {}; //正在选择的城市
    //上面城市逻辑，下面是组件属性设置######

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
    };
    
    this.chartExtend = {
      series: {
        itemStyle: {
          normal: {
            borderColor: "rgba(0, 0, 0, 0.2)",
            color: function(params) { // 根据row中数据取得color
              if (params == null) return null;
              var k = theself.getdata(params.name);
              if (k != null) return k.color;
              return null;
            }
          },
          emphasis: {
            areaColor: null,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            borderWidth: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
            color: null,
          },
        },
        showLegendSymbol: false, 
        textFixed: {TianShui : [100, -100]},
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
        },
      },
    };
    this.chartEvents = { // 点击地图城池
      click(e) {
        theself.selectedstatus = theself.getdata(e.name);
        if (e.name != "") theself.isselectedcity = true;
        else theself.isselectedcity = false;
        theself.$forceUpdate();
        console.log(e);
        console.log(this);
        console.log(theself);
        //console.log(theself.series.data);
      },
      mouseover(e) {
        console.log(e.name);
      }
    };
  }
};
</script>