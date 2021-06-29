<template>
    <div>
        <div class="nav">


            <div class="d-flex flex-row">
                <div>
                    <img alt="Cat logo" src="../assets/cat.png" width="70px">
                </div>
                <router-link to="/" class="routeLink">Recent Articles</router-link>
                <router-link to="/about" class="routeLink">About</router-link>
            </div>


            <router-link to="/login" v-if="authenticated === false">
                <span class="routeLink">Log in</span>
                <i class="fas fa-arrow-right" />
            </router-link>


            <div class="d-flex flex-row" v-if="authenticated === true">
                <router-link to="/administration" class="routeLink text-muted">My Articles</router-link>
                <router-link to="/createArticle" class="routeLink">Create Article</router-link>

                <!-- dropdown for log out -->
                <div class="dropdown">

                    <button class="btn dropdown-toggle routeLink" type="button" id="dropdownMenuButton" data-toggle="dropdown">
                        <i class="far fa-user" />
                    </button>

                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <span  class="dropdown-item" @click="logOut()">
                            Log out
                            <i class="fas fa-sign-out-alt actionIcon" />
                        </span>
                    </div>

                </div>

            </div>




        </div>
    </div>
</template>

<script>

import router from "@/router";

export default {
    name: "Navbar",
    props: {
        authenticated: Boolean
    },
    methods: {
        async logOut() {
            const res = await this.sendHttpRequest('/users/logout', 'POST', true);

            if (res.status === 200 || res.status === 401) {
                localStorage.removeItem('userToken');
                await router.push('/login')
            }
        }
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

            .dropdown {
                margin: 0;
                padding: 0;
            }

            .dropdown-toggle {
                margin: 0;
                padding: 0;
            }

            .routeLink {
                margin-left: 20px ;
            }

        }


    }


</style>
