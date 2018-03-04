<template>
  <div>
    <h2 class="title">武将百科</h2>
    <input type="text" placeholder="查找武将" v-model='keyWord' v-on:input="search"/>
    <table id="payouts"
           class="table table-striped table-sm table-bordered"
           cellspacing="0"
           width="100%">
      <thead>
      <tr>
        <th @click="setSortKey('姓名')">姓名</th>
        <th @click="setSortKey('综合')">综合</th>
        <th @click="setSortKey('统御')">统御</th>
        <th @click="setSortKey('武力')">武力</th>
        <th @click="setSortKey('智力')">智力</th>
        <th @click="setSortKey('政治')">政治</th>
        <th @click="setSortKey('魅力')">魅力</th>
        <th @click="setSortKey('所属')">所属</th>
      </tr>
      </thead>
      <tbody>
      <a href="/hero/{{hero.id}}" target="_blank">
        <tr v-for="(hero,index) in heros"
            :key="index">
          <td>{{hero.姓名}}</td>
          <td>{{hero.综合}}</td>
          <td>{{hero.统御}}</td>
          <td>{{hero.武力}}</td>
          <td>{{hero.智力}}</td>
          <td>{{hero.政治}}</td>
          <td>{{hero.魅力}}</td>
          <td>13FX90</td>
        </tr>
      </a>
      </tbody>
    </table>
  </div>

</template>

<script>
  export default {
    name: 'HeroListView',
    data() {
      this.sortKey = '综合';
      this.isAsc = false;
      this.allHeros = []
      return {
        heros: [],
      };
    },
    mounted() {
      window.yy = this;
      console.log(this.me);
      this.$http.get('static/heroes.json').then((response) => {
        this.heros = this._.orderBy(
          response.body,
          this.sortKey,
          this.isAsc ? 'asc' : 'desc',
        );
        this.allHeros = this.heros;
      });
    },
    methods: {
      setSortKey(sortKey) {
        this.isAsc = this.sortKey === sortKey ? !this.isAsc : false;
        this.sortKey = sortKey;
        this.heros = this._.orderBy(
          this.heros,
          this.sortKey,
          this.isAsc ? 'asc' : 'desc',
        );
      },
    },
    methods: {
      search() {
        if (keyWord === undefined || keyWord === null || keyWord === '') {
          this.heros = this.allHeros;
        } else {
          this.heros = [];
          this.allHeros.forEach(function (hero) {
            if (hero.姓名.contain(keyWord)) {
              this.heros.append(hero);
            }
          });
        }
      }
    },
  };
</script>

<style scoped="">
  .title {
    text-align: center;
  }

  input {
    border: 1px solid #ccc;
    padding: 7px 0px;
    border-radius: 3px;
    padding-left: 5px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s
  }

  input:focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6)
  }
</style>
