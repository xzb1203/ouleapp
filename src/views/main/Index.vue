<template>
  <div class="main">
    <!-- 侧面导航栏 -->
    <div class="silder">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item v-for="(items,key) in listName" :key="key" :title="items.name" />
      </van-sidebar>
    </div>
    <!-- 内容区域 -->
    <div class="content">
      <div v-for="(items,index) in listName" :key="index">
        <h5>{{items.name}}</h5>
        <van-card
          v-for="(res,key) in items.foods"
          :key="key"
          :price="res.price"
          :desc="'月售'+res.sellCount+'份'"
          :title="res.name"
          :thumb="res.imgUrl"
          :origin-price="res.price"
        >
          <template #tags>
            <van-tag plain type="danger">{{res.category}}</van-tag>
          </template>
          <template #footer>
            <van-stepper v-model="numValue" theme="round" button-size="22" disable-input />
          </template>
        </van-card>
      </div>
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
      listName: [],
      numValue: 0,
    };
  },
  //created
  created() {
    //获取商品数据
    shopData().then((res) => {
      this.listName = res.data.goodsList;
    });
  },
  methods:{
    
  }
};
</script>

<style lang="less" scoped>
.main {
  flex: 1;
  display: flex;
  height: 100%;
  overflow: scroll;
  .silder {
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