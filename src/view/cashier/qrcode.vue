<template>
  <div>
    <input
      type="file"
      accept="image/*"
      capture="camera"
    >
  </div>

</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang='scss' scoped>
.goods-bt {
  font-size: 1.4rem;
  color: #000;
  text-align: left;
  margin-top: 0.5rem;
}
.goods-text {
  text-align: right;
  .old-price {
    color: #999;
    text-decoration: line-through;
    font-size: 1rem;
    margin-right: 1px;
  }
}
</style>