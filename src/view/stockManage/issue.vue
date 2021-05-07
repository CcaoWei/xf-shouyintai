<template>
  <div class="i-box">
    <s-details :orderDetails="orderDetails"></s-details>
  </div>
</template>

<script>
import sDetails from "@/components/stock/s-detail";
export default {
  data(){
    return{
      orderDetails:this.$route.query.orderDetails
    }
  },
  components: {
    sDetails
  }
};
</script>
<style lang="scss" scoped>
  .i-box{
    height: 100%;
    overflow-y: scroll;
  }
</style>