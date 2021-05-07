<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  //乘法
  function accMul(arg1, arg2) {
    var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length;
      // eslint-disable-next-line no-empty
    } catch (e) {}
    try {
      m += s2.split(".")[1].length;
      // eslint-disable-next-line no-empty
    } catch (e) {}
    return (
      (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
      Math.pow(10, m)
    );
  }

  //加法
  function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return ((arg1 * m + arg2 * m) / m).toFixed(2);
  }

  //减法
  function accSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = r1 >= r2 ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  }


  Number.prototype.mul = function (arg) {
    return accMul(arg, this);
  };
  Number.prototype.add = function (arg) {
    return accAdd(arg, this);
  };
  Number.prototype.sub = function (arg) {
    // console.log("######");
    // console.log(arg);
    // console.log(this);
    // console.log("$$$$$$");
    return accSub(this, arg);
  };

  export default {
    name: "App"
  };
</script>

<style lang="scss">
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    overflow: hidden;
    /* margin-top: 60px; */
  }

  .date-select {
    position: fixed !important;
    top: 1rem !important;
    right: 1rem !important;
    font-size: 2rem !important;
    color: #fff !important;
  }

  .btn-save {
    position: fixed !important;
    top: 1.25rem !important;
    right: 1.25rem !important;
    z-index: 1;
    font-family: PingFangSC-Medium;
    font-size: 0.875rem !important;
    color: #8f9bb3 !important;
  }

  .add-box {
    height: 5.125rem;

    background: #ffffff;
    box-shadow: 0 0 0.0625rem 0 rgba(10, 22, 70, 0.06),
    1.25rem 0 2.875rem -0.625rem rgba(10, 22, 70, 0.1);
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;

    .btn {
      border-radius: 1.375rem;
      background-image: linear-gradient(90deg, #ff7901 3%, #fe5845 100%);
      color: #fff;
      font-size: 1.2rem;
      padding: 0 1rem;
      width: 92%;
    }
  }

  .base {
    /* height: 77vh; */
    overflow-y: auto !important;
    height: 100% !important;
    padding-bottom: 1rem !important;
    box-sizing: border-box !important;
  }

  .other-box {
    height: 100%;
  }
  .btn-area {
    background-color: #FFF;
    position: fixed;
    bottom: 0;
    height: 5.125rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-shadow: 0 0 .0625rem 0 rgba(10, 22, 70, 0.06), 1.25rem 0 2.875rem -0.625rem rgba(10, 22, 70, 0.10);

    .btn-edit {
      background-image: linear-gradient(90deg, #FF7901 3%, #FE5845 100%);
      border-radius: 1.375rem;
      font-family: PingFangSC-Semibold;
      font-size: 1rem;
      color: #FFFFFF;
      text-align: center;
      width: 90%;
      height: 2.75rem;
      border: 0;
    }
  }
</style>
