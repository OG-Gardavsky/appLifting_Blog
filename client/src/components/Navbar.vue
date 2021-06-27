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
                <i class="fas fa-arrow-right" />
            </router-link>


            <span id="loggedUserLinks" class="d-flex flex-row" v-if="authenticated">
                <router-link to="/administration" class="routeLink text-muted">My Articles</router-link>
                <router-link to="/createArticle" class="routeLink">Create Article</router-link>
                <!-- dropdown for log out -->
                <div class="dropdown">
                <button class=" dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src="../assets/cat.png" alt="Avatar" class="avatar">
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <span  class="dropdown-item" @click="logOut()">
                        Log out
                        <i class="fas fa-sign-out-alt actionIcon" />
                    </span>

                </div>
            </div>
            </span>




        </div>
    </div>
</template>

<script>
import router from "@/router";

export default {
     name: "Navbar",
    data() {
         return {
             authenticated: false
         }
    },
    methods: {
         async logOut() {
            const res = await this.sendRequest('/users/logout', 'POST', true);

             if (res.status === 200 || res.status === 401) {
                 localStorage.removeItem('userToken');
                 await router.push('/');
             }
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
