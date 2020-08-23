<template>
  <Home></Home>
</template>
<script>
import Home from './views/Home'
export default {
  components: {
    Home
  }
}
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
body,
html {
  height: 100%;
  background-color: #f4f4f4;
  ul li {
    list-style: none;
  }
  em,
  i {
    font-style: normal;
  }
  #app {
    height: 100%;
  }
}
</style>
