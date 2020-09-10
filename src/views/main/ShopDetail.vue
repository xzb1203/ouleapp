<template>
  <div class="main">
    <img
      src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3597840423,2168083474&fm=26&gp=0.jpg"
      alt
      style="height:200px;width:100%"
    />
    <div class="details">
      <h4>荤素双人套餐(配米饭两份+饮品两份)</h4>
      <p>
        <span>月售68份</span>
        <span>好频率100%</span>
      </p>
      <div class="price">
        <p>
          <span class="new-price">￥93.9</span>
          <del>￥99.9</del>
        </p>
        <van-button round style="background-color:#FA4830;color:#fff">
          <van-icon name="cart" />&emsp;加入购物车
        </van-button>
      </div>
    </div>
    <!-- 商品介绍 -->
    <div class="introduce">
      <h5>商品介绍</h5>
      <p>一碗皮蛋瘦肉粥,总是我到店时的不二之选,香浓软糯,饱腹暖心,皮蛋的Q弹与瘦肉的滑嫩伴着粥香溢余满口,让人喝这样的一碗粥页觉得心满意足</p>
    </div>
    <!-- 商品评价 -->
    <div class="evaluate">
      <van-tabs type="card">
        <van-tab title="全部90">内容 1</van-tab>
        <van-tab title="推荐50">内容 2</van-tab>
        <van-tab title="吐槽40">内容 3</van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
// import { shopData } from "@/api/apis.js";
export default {
  data() {
    return {};
  },
  // async created() {
  //   let res = await shopData();
  //   console.log(res);
  // },
};
</script>

<style lang="less" scoped>
.main {
  overflow: scroll;
  display: flex;
  flex-direction: column;
  height: 150%;
}
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

</style>