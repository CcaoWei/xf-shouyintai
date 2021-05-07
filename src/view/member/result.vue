<template>
  <div class="baseArea">
    <div class="cardArea">
      <div class="card-body">
        <van-card class="card-item">
          <div slot="desc">
            <van-icon class="big-icon" name="/static/success.png"/>
            <div class="big-message">恭喜！新增会员成功</div>
            <van-row class="card-row">
              <van-col class="font-title" span="12">录入时间</van-col>
              <van-col class="font-h" span="12">{{data.createTime}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">会员编号</van-col>
              <van-col class="font-h" span="12">{{data.membersCode}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">会员等级</van-col>
              <van-col class="font-h" span="12">{{data.memberTypeName}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">手机号</van-col>
              <van-col class="font-h" span="12">{{data.phone}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">姓名</van-col>
              <van-col class="font-h" span="12">{{data.name}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">性别</van-col>
              <van-col class="font-h" span="12">
                <span v-if="data.sex == 1">男</span>
                <span v-if="data.sex == 2">女</span>
              </van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">邮箱</van-col>
              <van-col class="font-h" span="12">{{data.mail}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">生日</van-col>
              <van-col class="font-h" span="12">{{data.birthday}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">年龄</van-col>
              <van-col class="font-h" span="12">{{data.age}}</van-col>
            </van-row>
            <div class="shadow-row"></div>
            <van-row class="card-row">
              <van-col class="font-title" span="12">所属门店</van-col>
              <van-col class="font-h" span="12">{{data.storeName}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">操作员</van-col>
              <van-col class="font-h" span="12">{{data.operationManager}}</van-col>
            </van-row>
          </div>
        </van-card>
      </div>
    </div>
    <div class="btn-area">
      <button class="btn-edit" @click="goBack">完成</button>
    </div>
  </div>

</template>

<script>

  export default {
    components: {},
    computed: {},
    data() {
      return {
        data: {}
      };
    },
    created() {
      this.data = this.$route.query.result;
    },

    methods: {
      goBack(){
        this.$router.push('/entrance/addMember')
      }
    },
  };
</script>

<style lang='scss' scoped>

  .baseArea {
    height: 100%;
    overflow-y: auto;

    .cardArea {
      overflow-y: auto;
      height: calc(100% - 5.5rem);

      .card-body {
        width: 92%;
        margin: .5rem auto 0;

        /deep/ .van-card {
          background: #fff;
        }

        .card-item {
          box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
          border-radius: .3rem;
          margin-bottom: 1rem;

          /deep/ .van-card {
            background: #fff;
            padding: 0;
          }

          .big-icon {
            font-size: 4.1875rem;
          }

          .big-price {
            font-family: PingFangSC-Semibold;
            font-size: 1.875rem;
            color: #222B45;
          }

          .big-message {
            font-family: PingFangSC-Semibold;
            font-size: 1.125rem;
            color: #222B45;
            text-align: center;
            margin-top: 1.125rem;
            margin-bottom: 1.5rem;
          }

          .card-row {
            height: 2.75rem;
            display: flex;
            flex-direction: row;
            align-items: center;

            .font-title {
              font-family: PingFangSC-Regular;
              font-size: .875rem;
              color: #222B45;
              letter-spacing: 0;
              text-align: left;
              opacity: 0.5;
            }

            .font-h {
              font-family: PingFangSC-Regular;
              font-size: .875rem;
              color: #222B45;
              text-align: right;
            }
          }

          .shadow-row {
            border-bottom: 1px solid rgba(143, 155, 179, 0.10);
            border-top: 1px solid rgba(143, 155, 179, 0.10);
          }

          /deep/ .van-card__content {
            min-height: 0;
            padding: .5rem 0;
          }
        }
      }
    }
  }

</style>
