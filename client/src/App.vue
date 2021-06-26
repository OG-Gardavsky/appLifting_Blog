<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main {
    max-width: 60%;
    margin: 30px auto;
}

.adminHeadline {

    display: flex;

    h1 {
        margin: 10px;
    }
    button {
        margin: 10px;
    }

}

</style>
