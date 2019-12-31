<template>
  <div class="container">
    <h1>{{tip}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tip: 'vue 运行环境创建成功'
    }
  },
  /** 创建----- */
  created() {
    console.log('created')
  }
}
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
}
</style>