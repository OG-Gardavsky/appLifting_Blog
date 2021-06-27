<template>
    <div>
        <Navbar />
        <div class="main">

            <div class="adminHeadline">
                <h1>Edit Article</h1>
                <button class="btn btn-primary" @click="editArticle()">Publish Article</button>
            </div>

        </div>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
    name: "EditArticle",
    components: {Navbar},
    methods: {
        editArticle() {


        }
    }
}
</script>

<style scoped>

</style>
