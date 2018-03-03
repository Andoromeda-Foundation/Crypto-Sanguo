<template>
<div>
  <h2 class="title">武将百科</h2>
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
      <tr v-for="hero in this.heros">
        <td>{{hero.姓名}}</td>
        <td>{{hero.综合}}</td>
        <td>{{hero.统御}}</td>
        <td>{{hero.武力}}</td>
        <td>{{hero.智力}}</td>
        <td>{{hero.政治}}</td>
        <td>{{hero.魅力}}</td>
        <td>13FX90</td>
      </tr>
    </tbody>
  </table>
</div>

</template>

<script>
export default {
  name: 'HeroListView',
  data() {
    this.sortKey = '综合'
    this.isAsc = false
    return {
      heros: []
    }
  },
  mounted: function() {
    console.log(this.me)
    this.$http.get('static/heroes.json').then(function(response) {
      this.heros = _.orderBy(response.body, this.sortKey, this.isAsc ? 'asc' : 'desc')
    })
  },
  methods: {
    setSortKey: function(sortKey) {
      this.isAsc = (this.sortKey === sortKey) ? !this.isAsc : false
      this.sortKey = sortKey
      this.heros = _.orderBy(this.heros, this.sortKey, this.isAsc ? 'asc' : 'desc')
    }
  }
};

</script>

<style scoped="">
.title {
  text-align: center;
}
</style>
