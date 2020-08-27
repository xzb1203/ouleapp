<template>
  <div class="main">
    <!-- 侧面导航栏 -->
    <div class="silder">
      <div>
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            v-for="(items,key) in getShopList_x"
            :key="key"
            :title="items.name"
            @click="clickTab(key)"
            :id="'0'+key"
          />
        </van-sidebar>
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="content">
      <div>
        <div v-for="(items,index) in getShopList_x" :key="index" :id="index">
          <h5>{{items.name}}</h5>
          <van-card
            v-for="(child,key) in items.foods"
            :key="key"
            :price="child.price"
            :desc="'月售'+child.sellCount+'份'"
            :title="child.name"
            :thumb="child.imgUrl"
            :origin-price="child.price"
            @click-thumb="showPopup(child)"
          >
            <template #tags>
              <van-tag plain type="danger">{{child.category}}</van-tag>
            </template>
            <template #footer>
              <van-stepper
                v-model="child.num"
                theme="round"
                :input-width="child.num>0 ?'15px' :'0px'"
                button-size="22"
                :show-minus="child.num ?true :false"
                disable-input
                min="0"
               
              />
            </template>
          </van-card>
        </div>
      </div>
    </div>
    <!-- 详情页弹出层 -->
    <van-popup v-model="show" position="top" >
      <div class="shop-list">
        <img
          :src="shop_list.imgUrl"
          alt
          style="height:200px;width:100%"
        />
        <div class="details">
          <h4>{{shop_list.goodsDesc}}</h4>
          <p>
            <span>月售68份</span>
            <span>好频率100%</span>
          </p>
          <div class="price">
            <p>
              <span class="new-price">{{'￥'+ shop_list.price}}</span>
              <del>{{'￥'+ (shop_list.price+1).toFixed(2)}}</del>
            </p>
            <van-button round style="background-color:#FA4830;color:#fff">
              <van-icon name="cart" />&emsp;加入购物车
            </van-button>
          </div>
        </div>
        <!-- 商品介绍 -->
        <div class="introduce">
          <h5>商品介绍</h5>
          <p>{{shop_list.goodsDesc}}</p>
        </div>
        <!-- 商品评价 -->
        <!-- <div class="evaluate">
          <van-tabs type="card">
            <van-tab title="全部90">内容 1</van-tab>
            <van-tab title="推荐50">内容 2</van-tab>
            <van-tab title="吐槽40">内容 3</van-tab>
          </van-tabs>
        </div> -->
      </div>
    </van-popup>
  </div>
</template>
<script>
import { shopData } from "@/api/apis.js";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      activeKey: 0,
      //商品分类名称
      numValue: 0,
      show: false,
      shop_list:{}
    };
  },

  //created
  async created() {
    //获取商品数据
    let res = await shopData();
    //把res里的数据传到vuex中
    for (let items of res.data.goodsList) {
      for (let child of items.foods) {
        child.num = 0;
      }
    }
    this.$store.commit("getShopList", res.data.goodsList);
  },
  methods: {
    clickTab(key) {
      this.activeKey = key;
      this.rightscroll.scrollToElement(document.getElementById(key), 600);
    },
    clickAdd(num, id) {
      this.$store.commit("changegoodsnum", { num, id });
    },
    //详情页面
    showPopup(child) {
      console.log(child);
      this.shop_list=child;
      this.show = true;
    },
  },
  //mounted
  mounted() {
    this.leftscroll = new BScroll(".silder", {
      click: true,
    });
    this.rightscroll = new BScroll(".content", {
      click: true,
      probeType: 3,
    });
    this.rightscroll.on("scroll", (obj) => {
      let _y = Math.abs(obj.y);
      for (let obj of this.getDivarr) {
        if (_y >= obj.startY && _y < obj.endY) {
          this.activeKey = obj.index;
          this.leftscroll.scrollToElement(
            document.getElementById("0" + obj.index),
            600
          );
          break;
        }
      }
    });
  },
  //计算属性
  computed: {
    getDivarr() {
      let arr = [];
      let total = 0;
      for (let i = 0; i < this.getShopList_x.length; i++) {
        let boxHeight = document.getElementById(i).offsetHeight;
        arr.push({ startY: total, endY: total + boxHeight, index: i });
        total += boxHeight;
      }
      return arr;
    },
    getShopList_x() {
      return this.$store.state.shopList;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  flex: 1;
  display: flex;
  height: 100%;
  overflow: hidden;
  .silder {
    width: 80px;
    height: 90%;
    overflow: scroll;
  }
  .content {
    flex: 1;
    overflow: scroll;
    height: 90%;

    h5 {
      padding: 6px 0 0 5px;
      box-sizing: border-box;
    }
    .van-card {
      background-color: #ffffff;
    }
  }
  .van-sidebar-item {
    padding: 20px 4px;
    padding-left: 10px;
  }
  .addNum {
    display: flex;
    align-items: center;
    .num {
      display: block;
      width: 30px;
      text-align: center;
    }
    .add {
      display: block;
      width: 26px;
      height: 26px;
      line-height: 26px;
      border-radius: 13px;
      font-weight: bold;
      text-align: center;
      background: #fdc200;
      font-size: 22px;
    }
  }
}
.shop-list {
  overflow: scroll;
  display: flex;
  flex-direction: column;
  height: 150%;
  .details {
    background-color: #ffffff;
    padding: 5px;
    box-sizing: border-box;
    h4 {
      line-height: 30px;
    }
    > p {
      line-height: 30px;
      color: #999999;
      font-size: 14px;
    }
    .price {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .new-price {
        font-weight: bold;
        color: #fa4830;
        font-size: 20px;
      }
      del {
        font-size: 14px;
        color: #999999;
      }
    }
  }
  .introduce {
    padding: 10px;
    box-sizing: border-box;
    background-color: #ffffff;
    margin-top: 20px;
    h5 {
      line-height: 30px;
    }
    p {
      font-size: 14px;
      line-height: 20px;
    }
  }
  .evaluate {
    margin-top: 20px;
    padding: 15px;
    background-color: #fff;
  }
}
</style>