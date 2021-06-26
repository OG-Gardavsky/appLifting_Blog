<template>
    <div>
        <div class="nav">

            <!--  -->
            <span id="defaultLinks" class="d-flex flex-row">
                <img alt="Cat logo" src="../assets/cat.png" width="60px">
                <router-link to="/" class="routeLink">Recent Articles</router-link>
                <router-link to="/about" class="routeLink">About</router-link>
            </span>


            <router-link to="/login" v-if="!authenticated">
                <span class="routeLink">Log in</span>
                <i class="fas fa-arrow-right"></i>
            </router-link>


            <span id="loggedUserLinks" class="d-flex flex-row" v-if="authenticated">
                <router-link to="/" class="routeLink text-muted">My Articles</router-link>
                <router-link to="/about" class="routeLink">Create Article</router-link>
                <img src="../assets/cat.png" alt="Avatar" class="avatar">
            </span>


        </div>
    </div>
</template>

<script>
export default {
     name: "Navbar",
    data() {
         return {
             authenticated: false
         }
    },
    async created() {
        this.authenticated = await this.checkCredentials();
    }
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

            #defaultLinks {
                img {
                    margin: 10px;
                }
            }

            .fa-arrow-right {
                margin: 10px 0;
            }


            .avatar {
                vertical-align: middle;
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }


        }


    }


</style>
