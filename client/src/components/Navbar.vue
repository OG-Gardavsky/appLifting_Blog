<template>
    <div>


        <ul class="nav">

            <span id="rightLinks" class="d-flex flex-row">
                <img alt="Vue logo" src="../assets/cat.png" width="60px">

                <span> <router-link to="/">Recent Articles</router-link> </span>

                <span> <router-link to="/about">About</router-link> </span>

            </span>

            <li class="nav-item d-flex flex-row">
                <a class="nav-link" href="#">Log in</a>
                <i class="fas fa-arrow-right"></i>
            </li>

        </ul>


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

            #rightLinks {


                //&.router-link-exact-active

                span {
                    margin: 10px;
                }


            }



            .fa-arrow-right {
                margin: 10px 0;
            }

        }
    }


</style>
