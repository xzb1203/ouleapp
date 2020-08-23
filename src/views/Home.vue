<template>
  <div id="main">
    <header>
      <!-- 头像和标题 -->
      <div class="top">
        <!-- logo -->
        <div class="logo">
          <img :src="seller.avatar" alt />
        </div>
        <div class="text">
          <p>
            <van-tag type="danger">品牌</van-tag>
            {{seller.name}}
          </p>
          <p>{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
          <p class="van-ellipsis">
            <van-tag plain type="danger">减</van-tag>
            <span v-for="(items,index) in seller.supports" :key="index" class="titleHot">{{items}}</span>
          </p>
        </div>
        <div class="label">
          <van-tag round type="warning" @click="show = true">{{num}}个></van-tag>
          <!-- 弹出层star -->
          <van-overlay :show="show">
            <div class="wrapper" @click="show = false">
              <!-- 顶部 -->
              <div class="wrapper-head">
                <h4>{{seller.name}}</h4>
                <van-rate
                  v-model="value"
                  :size="20"
                  color="#FF9A02"
                  void-icon="star"
                  void-color="#eee"
                />
                <van-divider>优惠信息</van-divider>
              </div>
              <!-- 活动内容 -->
              <ul class="activity">
                <li v-for="(items,index) in seller.supports" :key="index">
                  <van-tag
                    plain
                    type="danger"
                  >{{items.includes('减') ?'减' :items.includes('特') ?'特' :'折'}}</van-tag>
                  <span>{{items}}</span>
                </li>
              </ul>
              <!-- 商家公告 -->
              <van-divider>商家公告</van-divider>
              <p class="com">{{seller.bulletin}}</p>
            </div>
          </van-overlay>
          <!-- 弹出层end -->
        </div>
      </div>
      <van-notice-bar
        background="rgba(155,155,155,0.5)"
        color="#ffffff"
        left-icon="volume-o"
        :text="seller.bulletin"
      />
    </header>
    <!-- 导航栏 -->
    <nav>
      <router-link to="/">商品</router-link>
      <router-link to="/evaluate">评价</router-link>
      <router-link to="/merchant">商家</router-link>
      <router-link to="/shopdetail">详情</router-link>
    </nav>
    <!-- 主体 -->
    <main>
      <router-view></router-view>
    </main>
    <!-- 底部 -->
    <footer>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
        <van-goods-action-icon icon="cart-o" badge="5" text="购物车" @click="showPopup" />
        <van-goods-action-button type="danger" text="去结算" @click="onClickButton" />
      </van-goods-action>
    </footer>
    <!-- 弹出层star -->
    <van-popup v-model="bottomShow" round position="bottom" :style="{ height: '50%' }">内容</van-popup>
    <!-- 弹出层end -->
  </div>
</template>
<script>
import { Toast } from "vant";
import { seller } from "@/api/apis.js";

export default {
  data() {
    return {
      loading: true,
      //店铺信息
      seller: {},
      num: 0,
      value: 5,
      show: false,
      bottomShow: false,
    };
  },
  created() {
    //获取商家
    seller().then((res) => {
      this.seller = res.data.data;
      this.num = this.seller.supports.length;
    });
  },
  mounted() {
    this.loading = false;
  },
  methods: {
    //弹出框
    onClickIcon() {
      Toast("点击按钮");
    },
    onClickButton() {
      Toast("点击按钮");
    },
    //弹出层
    showPopup() {
      this.bottomShow = true;
    },
  },
};
</script>

<style lang="less" scoped>
#main {
  display: flex;
  flex-direction: column;
  height: 100%;
  header {
    background-color: #5c060f;
    background: url(../../src/assets/imgs/bg.jpg);
    height: 129px;
    display: fixed;
    .top {
      display: flex;
      padding: 10px 10px;
      box-sizing: border-box;
      color: white;
      justify-content: space-around;
      align-items: center;
      img {
        border-radius: 5px;
        width: 70px;
      }
      .text {
        line-height: 22px;
        p:nth-child(2) {
          font-size: 14px;
        }
        p:nth-child(3) {
          font-size: 12px;
          width: 200px;
        }
      }
      .label {
        align-self: flex-end;
      }
    }
  }
  nav {
    display: flex;
    justify-content: space-around;
    line-height: 50px;
    background-color: #ffffff;
    border-bottom: 1px solid #eeeeee;
    a {
      color: #333;
      &:active {
        color: #f60;
      }
    }
  }
  main {
    display: flex;
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
  //弹出框
  .wrapper {
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    .van-divider {
      color: #fff;
    }
    .wrapper-head {
      width: 100%;
      display: flex;
      flex-direction: column;
      text-align: center;
      .van-rate {
        justify-content: center;
        margin-top: 15px;
      }
    }
    .activity {
      font-size: 12px;
      line-height: 30px;
      .van-tag {
        margin-right: 5px;
      }
    }
    .com {
      font-size: 12px;
      line-height: 20px;
    }
  }
}
// 新的



</style>