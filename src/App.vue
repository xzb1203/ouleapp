<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
body,
html {
  height: 100%;
  background-color: #F4F4F4;
  ul li {
    list-style: none;
  }
  em,i{
    font-style: normal;
  }
  #app{
    height: 100%;
  }
}
</style>
