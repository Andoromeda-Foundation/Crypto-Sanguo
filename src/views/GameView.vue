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
              <div class="column has-text-left">
                城市
              </div>
              <div class="column has-text-right">
                {{selectedstatus.位置}}<!--新野-->
              </div>
              <div class="column has-text-left">
                势力
              </div>
              <div class="column has-text-right">
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
          <!-- 战斗中，出现条件：选择地图，且在战斗中 -->
          <article class="is-child notification is-danger" v-if="cityisbattling()">
            <div class="columns is-mobile">
              <div class="column has-text-left">
                战斗中
              </div>
              <div class="column has-text-right">
                {{selectedstatus.attacker}}
              </div>
              <div class="column has-text-left">
                进攻方武将数
              </div>
              <div class="column has-text-right">
                {{selectedstatus.attackheros.length}}
              </div>
            </div>
            <div class="columns is-mobile">
              <div class="column has-text-left">
                进攻方剩余兵力
              </div>
              <div class="column has-text-right">
                {{selectedstatus.attacktroops}}
              </div>
              <div class="column has-text-left">
                进攻方总统率力
              </div>
              <div class="column has-text-right">
                {{selectedstatus.attackpower}}
              </div>
            </div>
          </article>
          <!-- 武将界面 -->
          <article class="is-child notification">
            <div class="columns is-mobile is-primary">
              <div>
                <div v-if="cityisoccupied()">
                  城池武将：
                </div>
                <div v-for="hero in selectedstatus.武将" v-if="cityisoccupied()" :key="hero.name">
                  {{hero.name}} {{hero.attack}}
                </div>
                <div>
                  我的武将：
                </div>
                <div v-if="isselectedcity">
                  <div v-for="hero in msgheros" :key="hero.name">
                    <input type="checkbox" v-model="hero.selected">
                      {{hero.name}}
                    </input>
                     {{hero.attack}}
                     {{hero.cityname}}
                  </div>
                </div>
                <div v-else>
                  <div v-for="hero in msgheros" :key="hero.name">
                    {{hero.name}}  {{hero.attack}} {{hero.city}}
                  </div>
                </div>
              </div>
              <!-- v-else -->
            </div>
          </article>
          <!-- 操作界面 -->
          <!-- 主要作战界面，出现条件：选中地图，并且已经加入游戏，最主要的作战界面 -->
          <div v-if="isselectedcity">
          <article class="is-child notification is-warning" v-if="cityisoccupied()">
            <div class="columns" align="absmiddle">
              <div class="column">
                剩余点数:{{msgpoint}}
              </div>
              <div class="column is-one-fifth has-text-right">
                分配兵力:
              </div>
              <div class="column">
                <input class="input column is-small" v-model="troops" placeholder="选中武将以表明城市">
                </input>
              </div>
            </div>
            <div class="columns is-mobile">
              <div class="column is-one-fifth">
                <a class="button" v-bind:disabled="fivebutton(0)" v-on:click="attack">出征(60)</a>
              </div>
              <div class="column is-one-fifth">
                <a class="button" v-bind:disabled="fivebutton(1)" v-on:click="fallback">撤退(10)</a>
              </div>
              <div class="column is-one-fifth">
                <a class="button" v-bind:disabled="fivebutton(2)" v-on:click="foldin">调入(20)</a>
              </div>
              <div class="column is-one-fifth">
                <a class="button" v-bind:disabled="fivebutton(3)" v-on:click="movein">移动(5)</a>
              </div>
              <div class="column is-one-fifth">
                <a class="button" v-bind:disabled="fivebutton(4)" v-on:click="search">搜寻(120)</a>
              </div>
            </div>
          </article>
          <!-- 加入战局界面，出现条件：选中地图，但未加入战局-->
          <article class="is-child notification is-warning" v-else>
            <div class="columns is-mobile">
              <div class="column">
                <a class="button" v-on:click="occupy">占领城池</a>
              </div>
            </div>
          </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VeMap from 'v-charts/lib/map';

export default {
  components: { VeMap },
  created() {
    const troops = 0;
    const theself = this; // 用于在函数内取得this的属性
    // ###########后端交互相关###########
    this.chartData = {
      columns: ['位置', '势力', '兵力', '兵力恢复', '武将数', '总统率力'],
      rows: [
        // 下面会增加一个battling，代表正在战斗，默认false
        // attacker代表进攻方的势力，默认""
        // attacktroops代表进攻方兵力，默认0
        // attackheros为数组，代表出征武将，默认[]
        // attackpower代表进攻方武将的总统率力，默认为0
        {
          位置: '北平',
          势力: '0x123',
          兵力: 11,
          兵力恢复: 250,
          人口: 123,
          color: '#FFB03A',
          武将数: 2,
          总统率力: 11,
          武将: [{ name: '张飞', attack: 11 }, { name: '赵云' }]
        },
        { 位置: '襄平', 势力: '0x123', color: '#FFB03A' },
        { 位置: '蓟',
          势力: '0x321',
          color: '#BFFF3A',
          武将: [{ name: '西丑', attack: 8 }, { name: '东勾', attack: 12 }] },
        { 位置: '晋阳' },
        { 位置: '上党' },
        { 位置: '南皮' },
        { 位置: '兒' },
        { 位置: '北海' },
        { 位置: '陈留' },
        { 位置: '洛阳' },
        { 位置: '弘农' },
        { 位置: '长安' },
        { 位置: '天水' },
        { 位置: '武威' },
        { 位置: '酒泉' },
        { 位置: '下堰' },
        { 位置: '许昌' },
        { 位置: '寿春' },
        { 位置: '南阳' },
        { 位置: '襄阳' },
        { 位置: '长沙' },
        { 位置: '桂阳' },
        { 位置: '零陵' },
        { 位置: '建业' },
        { 位置: '会稽' },
        { 位置: '建安' },
        { 位置: '阜阳' },
        { 位置: '柴桑' },
        { 位置: '汉中' },
        { 位置: '武都' },
        { 位置: '永安' },
        { 位置: '江州' },
        { 位置: '成都' },
        { 位置: '朱提' },
        { 位置: '永昌' },
        { 位置: '建宁' },
        { 位置: '南海' },
        { 位置: '苍梧' },
        { 位置: '合浦' },
        { 位置: '郁林' },
        { 位置: '交趾' }
      ]
    };
    this.msgsender = '0x123';
    this.msgcolor = '#FFB03A';
    this.msgpoint = 500;
    this.msgheros = [{ name: '马超', attack: 10 }, { name: '诸葛亮' }];
    // 上面会在msgheros加一个selected，默认为false，后端万一出错再改
    // 下面会在msgheros加一个city，代表已经加入战场
    // 还会加一个cityname，之后会更新city，用于重新加载地图时的初始化
    // ###########后端交互相关###########

    this.usepoint = (input) => {
      if (input <= 0) return;
      this.msgpoint -= input;
    };
    this.getdata = (name) => {
      // 取得rows里的元素
      for (let i = 0; i < this.chartData.rows.length; i += 1) {
        if (name === this.chartData.rows[i].位置) {
          return theself.chartData.rows[i];
        }
      }
    };
    this.isselectedcity = false; // 是否选择城市
    this.cityisoccupied = () => {
      // 城池是否有人占领
      if (!theself.isselectedcity) return false;
      return theself.selectedstatus.势力 != null;
    };
    this.cityisbattling = () => {
      if (!theself.isselectedcity) return false;
      return theself.selectedstatus.battling;
    };
    this.gethero = () => {
      // 获取选中武将,返回{是否有武将，武将数量，武将数组，总统率力}
      let isselectedheros = false;
      let heroamount = 0;
      let allattacks = 0;
      const heros = []; // 内部放hero
      let hero = {};
      for (let i = 0; i < theself.msgheros.length; i += 1) {
        hero = theself.msgheros[i];
        // if (hero.city != null) continue;
        if (hero.selected) {
          heros.push(theself.msgheros[i]);
          heroamount += 1;
          allattacks += hero.attack;
          isselectedheros = true;
          // hero.city = theself.selectedstatus.位置;
        }
        hero.selected = false;
      }
      return {
        isselectedheros,
        heroamount,
        heros,
        allattacks
      };
    };
    this.occupy = () => {
      // 占领城池
      if (!theself.isselectedcity) return;
      if (theself.selectedstatus.势力 != null) return;
      const city = theself.selectedstatus;
      const sh = theself.gethero();
      if (!sh.isselectedheros) return;
      for (let i = 0; i < sh.heros.length; i += 1) {
        sh.heros[i].city = city;
        sh.heros[i].cityname = city.位置;
      }
      city.武将数 = sh.heroamount;
      city.武将 = sh.heros;
      city.总统率力 = sh.allattacks;
      city.势力 = theself.msgsender;
      city.color = theself.msgcolor;
      theself.$forceUpdate();
    };
    this.fivebutton = (input) => {
      // return false代表按钮有效
      if (!theself.isselectedcity) return;
      const city = theself.selectedstatus;
      if (theself.selectedstatus.势力 == null) return;
      if (input === 0) return !(city.势力 !== theself.msgsender);
      else if (input === 1) return !(city.battling && city.势力 !== theself.msgsender);
      else if (input === 2) return !(city.势力 === theself.msgsender);
      else if (input === 3) return !(city.势力 === theself.msgsender);
      else if (input === 4) return !(city.势力 === theself.msgsender);
    };
    this.attack = () => {
      // 出征
      if (theself.msgpoint < 60) return; // 行动点数不足
      if (!theself.isselectedcity) return; // waiting:提示：选择城市
      const city = theself.selectedstatus;
      if (city.势力 === theself.msgsender) return; // waiting:必须是他人城市
      if (!(theself.troops >= 1)) return; // waiting:必须输入大于1的兵力
      // waiting：选择战斗中城市的场合，支援兵力？
      const sh = theself.gethero();
      // waiting：不同武将带的兵力分配
      city.battling = true;
      city.attackheros = sh.heros;
      city.attackpower = sh.allattacks;
      city.attacker = theself.msgsender;
      city.attacktroops = theself.troops;
      theself.troops = 0;
      theself.msgpoint -= 60;
      theself.$forceUpdate();
    };
    this.fallback = () => {
      // 撤退
      if (theself.msgpoint < 10) return; // 行动点数不足
      if (!theself.isselectedcity) return; // waiting:提示：选择城市
      const city = theself.selectedstatus;
      if (city.势力 === theself.msgsender) return; // 必须是他人城市
      if (city.battling !== true) return; // waiting:必须战斗中
      const sh = theself.gethero();
      if (!sh.isselectedheros) return; // waiting:必须选择武将
      if (sh.heroamount !== 1) return; // waiting:只能撤退到一个城市
      if (sh.heros[0].city == null) return; // waiting:武将没有城市
      sh.heros[0].city.兵力 += city.attacktroops;
      // waiting：是否可以选择撤退部分兵力
      // waiting：兵力是否有上限
      city.battling = false;
      city.attackheros = [];
      city.attackpower = 0;
      city.attacker = null;
      city.attacktroops = 0;
      theself.msgpoint -= 10;
      theself.$forceUpdate();
    };
    this.foldin = () => {
      // 调入（兵力）
      if (theself.msgpoint < 20) return; // 行动点数不足
      if (!theself.isselectedcity) return; // waiting:提示：选择城市
      const city = theself.selectedstatus;
      if (city.势力 !== theself.msgsender) return; // 必须是自己城市
      if (!(theself.troops >= 1)) return; // waiting:必须输入大于1的兵力
      const sh = theself.gethero();
      if (!sh.isselectedheros) return; // waiting:必须选择武将
      if (sh.heroamount !== 1) return; // waiting:只能选择一个武将
      if (sh.heros[0].city == null) return; // waiting:武将没有城市
      // waiting：是否可以从多个城市调入兵力
      // waiting：兵力是否有上限
      if (sh.heros[0].city.兵力 < troops) return; // waiting：兵力不足
      city.兵力 += theself.troops;
      sh.heros[0].city.兵力 -= troops;
      theself.troops = 0;
      theself.msgpoint -= 20;
      theself.$forceUpdate();
    };
    this.movein = () => {
      // 移入（武将）
      if (theself.msgpoint < 5) return; // 行动点数不足
      if (!theself.isselectedcity) return; // waiting:提示：选择城市
      const city = theself.selectedstatus;
      if (city.势力 !== theself.msgsender) return; // 必须是自己城市
      const sh = theself.gethero();
      if (!sh.isselectedheros) return; // waiting:必须选择武将
      if (sh.heroamount !== 1) return; // waiting:只能选择一个武将
      sh.heros[0].city = city;
      sh.heros[0].cityname = city.位置;
      city.武将.push(sh.heros[0]);
      theself.msgpoint -= 5;
      theself.$forceUpdate();
    };
    this.search = () => {
      // 搜寻
      if (theself.msgpoint < 120) return; // 行动点数不足
      if (!theself.isselectedcity) return; // waiting:提示：选择城市
      const city = theself.selectedstatus;
      if (city.势力 !== theself.msgsender) return; // 必须是自己城市
      // 待做
      const newhero = {
        name: '曹操',
        attack: 20
      };
      newhero.city = city;
      newhero.cityname = city.位置;
      newhero.selected = false;
      city.武将.push(newhero);
      theself.msgheros.push(newhero);
      theself.usepoint(120);
      theself.$forceUpdate();
    };
    this.selectedstatus = {}; // 正在选择的城市
    // this.troops = 0;
    // 上面城市逻辑，下面是组件属性设置######

    this.legendVisible = false;
    this.chartSettings = {
      positionJsonLink: './static/gameGeo.json',
      position: 'world',
      beforeRegisterMap(json) {
        return json;
      },
      selectedMode: 'single',
      zoom: 1,
      roam: false
    };

    this.chartExtend = {
      series: {
        itemStyle: {
          normal: {
            borderColor: 'rgba(0, 0, 0, 0.2)',
            color(params) {
              // 根据row中数据取得color
              if (params == null) return null;
              const k = theself.getdata(params.name);
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
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            color: null
          }
        },
        showLegendSymbol: false,
        textFixed: { TianShui: [100, -100] },
        nameMap: {
          XiangPing: '襄平',
          BeiPing: '北平',
          Ji: '蓟',
          JinYang: '晋阳',
          ShangDang: '上党',
          NanPi: '南皮',
          Er: '兒',
          BeiHai: '北海',
          ChenLiu: '陈留',
          LuoYang: '洛阳',
          HongNong: '弘农',
          ChangAn: '长安',
          TianShui: '天水',
          WuWei: '武威',
          JiuQuan: '酒泉',
          XiaYan: '下堰',
          XuChang: '许昌',
          ShouChun: '寿春',
          NanYang: '南阳',
          XiangYang: '襄阳',
          ChangSha: '长沙',
          GuiYang: '桂阳',
          LingLing: '零陵',
          JianYe: '建业',
          KuaiJi: '会稽',
          JianAn: '建安',
          FuYang: '阜阳',
          ChaiSang: '柴桑',
          HanZhong: '汉中',
          WuDu: '武都',
          YongAn: '永安',
          JiangZhou: '江州',
          ChengDu: '成都',
          ZhuTi: '朱提',
          YongChang: '永昌',
          JianNing: '建宁',
          NanHai: '南海',
          CangWu: '苍梧',
          HePu: '合浦',
          YuLin: '郁林',
          JiaoZhi: '交趾'
        }
      }
    };
    this.chartEvents = {
      // 点击地图城池
      click(e) {
        theself.selectedstatus = theself.getdata(e.name);
        if (e.name !== '') theself.isselectedcity = true;
        else theself.isselectedcity = false;
        theself.$forceUpdate();
        console.log(e);
        console.log(this);
        console.log(theself);
        // console.log(theself.series.data);
      },
      mouseover(e) {
        console.log(e.name);
      }
    };
  }
};
</script>
