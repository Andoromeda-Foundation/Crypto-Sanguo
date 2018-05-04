<template>
  <div>
    <pdf
            v-for="i in numPages"
            :key="i"
            :src="src"
            :page="i"
            style="display: inline-block; width: 100%"
        ></pdf>

  </div>
</template>


<script>
import pdf from 'vue-pdf';

const loadingTask = pdf.createLoadingTask('static/assets/bp_004.pdf');

export default {
  components: {
    pdf
  },
  data() {
    return {
      src: loadingTask,
      numPages: undefined
    };
  },
  mounted() {
    this.src.then((pdfitem) => {
      this.numPages = pdfitem.numPages;
    });
  }
};

</script>

<style scoped>


</style>

