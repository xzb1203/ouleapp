<template>
  <div class="main">
    <!-- <h1>评价</h1> -->
    <!-- 评分 -->
    <div class="grade">
      <!-- 左侧 -->
      <div class="grade-left">
        <label>5.0</label>
        <label>综合评分</label>
        <label>高于周边商家96%</label>
      </div>
      <!-- 右侧 -->
      <div class="grade-right">
        <ul>
          <li>
            服务态度
            <van-rate v-model="value" allow-half void-icon="star" color="#FF9A02" :size="15" /><span>4.5</span>
          </li>
          <li>
            菜品质量
            <van-rate v-model="value" allow-half void-icon="star" color="#FF9A02" :size="15" /><span>4.5</span>
          </li>
          <li class="rateTime">
            送达时间
            <label class="deliveryTime">20分钟</label>
          </li>
        </ul>
      </div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <van-tabs v-model="activeName" type="card">
        <van-tab title="全部" name="a">
          <ul class="gradeMsg">
            <li v-for="(items,index) in usermsg" :key="index">
              <!-- 头像 -->
              <label>
                <img :src="items.avatar" />
              </label>
              <!-- 用户信息 右边-->
              <div class="usermsg">
                <!-- 第一行 -->
                <p class="title">
                  <span>{{items.username}}</span>
                  <span>{{timeFormat(items.rateTime)}}</span>
                </p>
                <!-- 第二行 -->
                <div class="isTwoDiv">
                  <van-rate
                    v-model="items.score"
                    :size="15"
                    color="#ffd21e"
                    void-icon="star"
                    void-color="#eee"
                  />
                  <span class="deliveryTime">{{items.deliveryTime}}分钟送达</span>
                </div>
                <!-- 第三行 -->
                <p class="text">{{items.text}}</p>
                <!-- 第四行 -->
                <div class="last-div">
                  <van-icon name="good-job" color="#FFD21E" />
                  <div>
                    <van-tag plain v-for="(items,index) in items.recommend" :key="index">{{items}}</van-tag>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </van-tab>
        <van-tab title="满意18" name="b">内容 2</van-tab>
        <van-tab title="不满意6" name="c">内容 3</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
//评价接口
import { ratings } from "@/api/apis.js";
import {timeFormat} from "@/utils/utils.js"
export default {
  data() {
    return {
      value: 4.5,
      activeName: "a",
      usermsg: [],
      //时间
      rateTime:[],
      timeFormat:'',
    };
  },
  created() {
    ratings().then((res) => {
      this.usermsg = res.data.data;
    });
    this.timeFormat=timeFormat
  },
};
</script>

<style lang="less" scoped>
.grade {
  display: flex;
  background-color: #ffffff;
  font-size: 12px;
  width: 100%;
  .grade-left {
    text-align: center;
    border-right: 1px solid #eeeeee;
    display: flex;
    flex-direction: column;
    padding: 10px 10px;
    box-sizing: border-box;
    & label:nth-child(1) {
      font-size: 20px;
      color: #ffc300;
      font-weight: bold;
    }
    & label:nth-child(2) {
      font-size: 14px;
      line-height: 20px;
    }
    & label:nth-child(3) {
      font-size: 12px;
    }
  }
  .grade-right {
    margin-left: 10px;
    display: flex;
    align-items: center;
    li {
      display: flex;
      align-items: center;
      span{
        color: #FF9A02;
      }
      .van-rate{
        margin: 2px 5px;
      }

    }
    .deliveryTime{
      color: #C8C9CC;
      margin-left: 5px;
    }
  }
}
.main {
  width: 100%;
}
// 内容
.content {
  margin-top: 15px;
  box-sizing: border-box;
  padding: 10px 5px;
  background-color: #ffffff;
  font-size: 12px;
  width: 100%;
  .gradeMsg {
    width: 100%;
    display: flex;
    // flex: 1;
    height: 500px;
    overflow: scroll;
    flex-direction: column;
    li {
      display: flex;
      border-bottom: 1px solid #f4f4f4;
      padding: 15px 5px;
      box-sizing: border-box;
      img {
        width: 50px;
        height: 50px;
      }
      label {
        overflow: hidden;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        margin-right: 5px;
        background-color: #cccccc;
      }
      .usermsg {
        width: 85%;
        .title {
          display: flex;
          justify-content: space-between;
        }
        .isTwoDiv {
          display: flex;
          align-content: center;
        }
        .deliveryTime {
          margin-left: 5px;
        }
        .van-tag {
          margin: 2px;
        }
        .text {
          line-height: 18px;
        }
      }
    }
    .last-div {
      display: flex;
      margin: 5px 0;
    }
  }
}
</style>