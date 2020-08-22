<template>
  <div class="main">
    <!-- 侧面导航栏 -->
    <div class="silder">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item v-for="(items,key) in listName" :key="key" :title="items"/>
      </van-sidebar>
    </div>
    <!-- 内容区域 -->
    <div class="content">
      <van-card num="2" v-for="(items,key) in shopMsg" :key="key" 
       :price="items.price" 
       :desc="'月售'+items.sellCount+'份'" 
       :title="items.name" 
       :thumb="items.imgUrl"
        :origin-price="items.price">
        <template #tags>
          <van-tag plain type="danger">{{items.category}}</van-tag>
        </template>
        <template #footer>
          <van-stepper v-model="numValue" theme="round" button-size="22" disable-input />
        </template>
      </van-card>
    </div>
  </div>
</template>
<script>
import { shopData } from "@/api/apis.js";

export default {
  data() {
    return {
      activeKey: 0,
      //商品分类名称
      listName:[],
      //商品信息
      shopMsg:[],
      numValue:1,
    };
  },
  //created
  created() {


    //获取商品数据
    shopData().then((res) => {
      for(let items of res.data.goodsList){
          //分类
          this.listName.push(items.name)
          this.shopMsg.push(items.foods)
      }
      for(let items of this.shopMsg){
        this.shopMsg=items
      }
      console.log(res.data.goodsList);
    });
  },
};
</script>

<style lang="less" scoped>
.main {
    flex: 1;
    display: flex;
    height: 100%;
    overflow: scroll;
  .silder{
    width: 80px;
    height: 100%;
    overflow: scroll;
  }
  .content {
    flex: 1;
    overflow: scroll;
    height: 100%;
    .van-card {
      background-color: #ffffff;
    }
  }
}
</style>