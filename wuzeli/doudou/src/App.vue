<template>
  <div id="app">
    <router-view></router-view>   <!--使用router-view标签给vue组件的跳转提供一个渲染容器，组件在这里渲染 -->
  </div>                          <!-- 使用router-linker标签试下跳转，类似a标签但不需要刷新页面 to中填写跳转的路径，定义路由时的path路径或者name路由名称，name唯一  to="/table" :to"{name:'table'}"-->
</template>                      

<script>

export default {
  name: 'App'
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
html,body{
  width: 100%;
  height: 100%;
}
#app {
  height: 100%;
}
</style>
