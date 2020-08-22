<template>
  <div id="main">
    <!--月售 -->
    <div class="mounth-order">
      <!-- 左 店铺名 -->
      <div>
        <p style="font-size:14px">{{seller.name}}</p>
        <p class="star">
          <van-rate v-model="seller.score" readonly allow-half :size="15" color="#FF9A02" void-icon="star" void-color="#eee" />
          <span>
            (661)
            <em>月售{{seller.sellCount}}单</em>
          </span>
        </p>
      </div>
      <!--右 收藏 -->
      <div class="collect">
        <!-- 图标 -->
        <van-icon name="like" color="#ff0000" />
        <!-- 文字 -->
        <span>已收藏</span>
      </div>
    </div>
    <!-- 商家服务 -->
    <ul class="serve">
      <li>
        <span>起送价</span>
        <span>{{seller.minPrice}}元</span>
      </li>
      <li>
        <span>商家配送</span>
        <span>{{seller.deliveryPrice}}元</span>
      </li>
      <li>
        <span>平均配送时间</span>
        <span>{{seller.deliveryTime}}分钟</span>
      </li>
    </ul>
    <!-- 活动公告 -->
    <div class="public">
      <h3>活动与公告</h3>
      <p>{{seller.bulletin}}</p>
      <van-divider />
    </div>
  </div>
</template>
<script>
import { seller } from "@/api/apis.js";
export default {
  data() {
    return {
      //店铺信息
      seller: {},
    };
  },
  //created
  created() {
    seller().then((res) => {
      this.seller = res.data.data;
    });
  },
};
</script>

<style lang="less" scoped>
#main {
  font-size: 12px;
}
.mounth-order {
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #f4f4f4;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 10px 0;
  .star {
    display: flex;
    align-items: center;
    margin: 6px 0;
  }
  .collect {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.serve {
  display: flex;
  justify-content: space-around;
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 25px;
  }
  background-color: #ffffff;
}
.public {
  margin-top: 10px;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 8px;
  h3 {
    line-height: 40px;
    font-weight: normal;
  }
  p {
    color: #f0390c;
    line-height: 20px;
  }
}
</style>