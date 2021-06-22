<template>
    <div>
        <div class="nav">

            <span id="rightLinks" class="d-flex flex-row">
                <img alt="Vue logo" src="../assets/cat.png" width="60px">
                <router-link to="/" class="routeLink">Recent Articles</router-link>
                <router-link to="/about" class="routeLink">About</router-link>
            </span>

            <router-link to="/login">
                <span class="routeLink">Log in</span>
                <i class="fas fa-arrow-right"></i>
            </router-link>

        </div>
    </div>
</template>

<script>
export default {
     name: "Navbar"
}
</script>

<style scoped lang="scss">
    div {
        background-color: #f3f2f2;
        padding-top: 10px;

        .nav {
            max-width: 70%;
            margin: 0 auto;
            justify-content: space-between;

            .routeLink {
                margin: 10px;
            }

            #rightLinks {
                img {
                    margin: 10px;
                }
            }

            .fa-arrow-right {
                margin: 10px 0;
            }

        }
    }


</style>
