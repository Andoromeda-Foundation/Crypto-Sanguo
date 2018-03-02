<template>
  <div>
    <h2 class="title">武将百科</h2>
    <table id="payouts" class="table table-striped table-sm table-bordered" cellspacing="0" width="100%">
      <thead>
            <tr>
                <th>姓名</th>
                <th>综合</th>
                <th>统御</th>
                <th>武力</th>
                <th>智力</th>
                <th>政治</th>
                <th>魅力</th>
                <th>所属</th>                
            </tr>
        </thead>
        <tbody>
          <tr v-for="data in datas">
              <td>曹操</td>
              <td>400</td>
              <td>100</td>
              <td>100</td>
              <td>100</td> 
              <td>100</td>
              <td>100</td>      
              <td>13FX90</td>                     
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: "TransactionView",
  data () {
    return {
      datas:[]
    }
  },
  mounted: function() {
    // this.$http.get('').then(function(response) {
    //       this.datas = response.body.datas;
    // });
    this.datas = ["","","",""];
  }

};
</script>

<style scoped>
.title {
  text-align: center;
}
</style>
