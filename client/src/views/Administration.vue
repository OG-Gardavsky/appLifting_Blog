<template>
    <div>
        <Navbar />
        <div class="main">
            <div class="adminHeadline">
                <h1>My articles</h1>

                <router-link to="/createArticle" >
                    <button class="btn btn-primary">Create new Article</button>
                </router-link>
            </div>

        </div>

    </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
    name: "Administration",
    components: {Navbar},
    created() {
        this.checkCredentials('/');
    }
}
</script>

<style scoped lang="scss">



</style>
