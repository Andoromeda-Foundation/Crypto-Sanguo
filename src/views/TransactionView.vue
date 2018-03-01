<template>
  <div>
    <h2 class="title">Recent Transaction Feed</h2>
    <table id="payouts" class="table table-striped table-sm table-bordered" cellspacing="0" width="100%">
      <thead>
            <tr>
                <th>Estate Name</th>
                <th>New Owner</th>
                <th>Purchase Price</th>
                <th>Timestamp</th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="data in datas">
              <td>Saint Basil&#039;s Cathedral</td>
              <td>F7714F4484</td>
              <td>1.5778 ETH</td>
              <td>1 day ago</td>
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
