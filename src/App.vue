<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/foo">Foo</router-link> |
    <router-link to="/test">Test</router-link> |
    <router-link to="/pinia">Pinia</router-link> |
    <router-link to="/myForm">MyForm</router-link> |
    <router-link to="/test01">Test01</router-link> |
  </div> -->
  <!-- <router-view v-slot="{ Component }">
    <keep-alive :include="['Home', 'Test01']">
      <component :is="Component"></component>
    </keep-alive>
  </router-view> -->
  <router-view></router-view>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
	// overflow: hidden;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

button {
  margin: 4px;
}
</style>
