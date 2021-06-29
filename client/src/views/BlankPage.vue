<template>
    <div>
        <Navbar :authenticated="authenticatedGlobal"/>

        <div class="main">
            <h1>Sorry nothing here</h1>

            <i class="fas fa-eye-slash fa-10x" />
        </div>

    </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
    name: "BlankPage",
    components: {Navbar},
    async created() {
        await this.checkCredentials();
    }
}
</script>

<style scoped lang="scss">
    .main {
        text-align: center;

        .fas {
            margin: 50px;
        }
    }

</style>
