<template>
  <div>
    <h2 class="title">Recent Transaction Feed</h2>
    <table id="payouts"
           class="table table-striped table-sm table-bordered"
           cellspacing="0"
           width="100%">
      <thead>
        <tr>
          <th>New Owner</th>
          <th>Purchase Price</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        <tr class="txs"
            v-for="(data,index) in datas"
            :key="index"
            v-on:click="clickList(data)"
            v-on:mouseover="overList()">
          <td>{{data.owner}}</td>
          <td>{{data.price}} ETH</td>
          <td>{{data.time}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TransactionView',
  data() {
    return {
      datas: []
    };
  },
  methods: {
    clickList(data) {
      const w = window.open('about:blank');
      const url = `https://etherscan.io/tx/${data.hash}`;
      w.location.href = url;
    },
    overList() {
      console.log('dsafsda');
    }
  },
  mounted() {
    this.$http
      .get(
        'https://api.etherscan.io/api?module=account&address=0x8d12a197cb00d4747a1fe03395095ce2a5cc6819&offset=100&page=1&sort=asc&apikey=FYFY6687BY19QA9TEF7NU2NAHQW6AFS5AN&action=txlist',
      )
      .then(
        (response) => {
          const result = JSON.parse(response.bodyText).result;
          console.log(result);
          const res = [];
          /* eslint-disable */
          for (const i in result) {
            const data = new Array();
            data.owner = web3.sha3(result[i].to).substr(2, 8);
            data.price =
              parseInt(result[i].gasPrice) *
              parseInt(result[i].gasUsed) /
              Math.pow(10, 18);
            data.time = new Date(
              parseInt(result[i].timeStamp) * 1000
            ).toLocaleString();
            data.hash = result[i].hash;
            res[i] = data;
          }
          this.datas = res;
        },
        response => {}
      );
    // this.datas = ["","","",""];
  }
};
</script>

<style scoped>
.title {
  text-align: center;
}
.txs {
  background: LightGray;
}
.txs:nth-child(odd) {
  background: white;
}
.txs:hover {
  background: gray;
}
</style>
