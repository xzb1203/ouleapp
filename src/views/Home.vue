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
      <van-tabs v-model="activeName">
        <van-tab title="商品" name="a" to="/"></van-tab>
        <van-tab title="评价" name="b" to="/evaluate"></van-tab>
        <van-tab title="商家" name="c" to="/merchant"></van-tab>
      </van-tabs>
    </nav>
    <!-- 主体 -->
    <main>
      <transition name="slide-fade">
        <router-view></router-view>
      </transition>
    </main>
    <!-- 底部 -->
    <footer style="z-index:9999">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon"/>
        <van-goods-action-icon icon="cart-o" :color="getSlectedNum>0 ?'#FA452F' :'#646566'" :badge="getSlectedNum" text="购物车" @click="showPopup"/>
          <van-goods-action-icon icon="shop-o" text="店铺" @click="onClickIcon" />
        <van-goods-action-button type="danger" 
        :text="getSlectedNum>0 ?'去下单￥'+getSum.toFixed(2) :'暂未挑选'" 
        @click="onClickButton" 
        :color="getSlectedNum>0 ?'#FA452F' :'#C1C1C1'"/>
      </van-goods-action>
    </footer>
    <!-- 弹出层star -->
    <van-action-sheet v-model="bottomShow" title="新用户下单立减5元" z-index="1;" id="popup">
      <div class="content" z-index="2;">
        <div>
          <span>购物车</span>
          <span>
            <van-icon name="delete" />
            <span class="shopcar-Text">清空购物车</span>
          </span>
        </div>
        <van-row class="optionbox" v-for="items in getShopcarList_x" :key="items.id">
          <van-col span="12">
            <span class="van-ellipsis">{{items.name}}</span>
          </van-col>
          <van-col span="6">
            <span style="color:red">{{'￥'+(items.price*items.num).toFixed(2)}}</span>
          </van-col>
          <van-col span="6">
            <van-stepper v-model="items.num" theme="round" button-size="22" disable-input min="0" />
          </van-col>
        </van-row>
        <p class="total" style="color:red;font-size:20px">总计:{{'￥'+getSum.toFixed(2)}}</p>
      </div>
    </van-action-sheet>
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
      value: 0,
      show: false,
      bottomShow: false,
      activeName: "a",
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
      this.bottomShow = !this.bottomShow;
    },
  },
  //计算属性
  computed: {
    getShopcarList_x() {
      return this.$store.getters.getShopcarList;
    },
    getSum(){
      let total = 0;
      for(let items of this.getShopcarList_x){
          total += items.num*items.price
      }
      return total
    },
    getSlectedNum(){
      let num = 0;
      for(let items of this.getShopcarList_x){
        num+=items.num;
      }
      return num;
    }
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
    .van-tabs {
      width: 100%;
      justify-content: space-around;
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
#popup {
  .content {
    padding: 20px 20px 50px 20px;
    .total{
      font-weight: bold;
      font-size: 16px;
    }
    div {
      display: flex;
      justify-content: space-between;
      .van-icon {
        vertical-align: middle;
      }
    }
    .optionbox {
      line-height: 32px;
      margin-top: 10px;
      span {
        display: inline-block;
        width: 100%;
        text-align: center;
      }
    }
    .shopcar-Text {
      vertical-align: middle;
      color: #c8c9cc;
      font-size: 12px;
    }
    .optionbox {
      display: flex;
      align-items: center;
    }
  }
}
//切换动画
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0 ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
</style>