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
  color: #2c3e50;
}

.main {
    max-width: 60%;
    margin: 30px auto;

    .actionIcon {
        margin: 10px;
    }
}

.adminHeadline {

    display: flex;

    margin-bottom: 30px;

    h1 {
        margin: 10px 10px 10px 0;
    }
    button {
        margin: 10px;
    }

}

</style>
