<template>
  <div class="main">
    <!-- 侧面导航栏 -->
    <div class="silder">
      <div>
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            v-for="(items,key) in listName"
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
        <div v-for="(items,index) in listName" :key="index" :id="index">
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
  methods: {
    clickTab(key) {
      this.activeKey = key;
      this.rightscroll.scrollToElement(document.getElementById(key), 600);
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
          this.leftscroll.scrollToElement(document.getElementById("0" + obj.index), 600);
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
      for (let i = 0; i < this.listName.length; i++) {
        let boxHeight = document.getElementById(i).offsetHeight;
        arr.push({ startY: total, endY: total + boxHeight, index: i });
        total += boxHeight;
      }
      return arr;
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
}
</style>